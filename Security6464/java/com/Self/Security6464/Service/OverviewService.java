package com.Self.Security6464.Service;

import com.Self.Security6464.Entity.Course;
import com.Self.Security6464.Entity.Enrollment;
import com.Self.Security6464.Entity.RecentActivity;
import com.Self.Security6464.Entity.UpcomingActivity;
import com.Self.Security6464.Repository.CourseRepository;
import com.Self.Security6464.Repository.EnrollmentRepository;
import com.Self.Security6464.Repository.RecentActivityRepository;
import com.Self.Security6464.Repository.UpcomingActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.*;

@Service
public class OverviewService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UpcomingActivityRepository upcomingActivityRepository;

    @Autowired
    private RecentActivityRepository recentActivityRepository;

    public Map<String, Object> getOverviewData(Long userId, String studentName) {
        Map<String, Object> response = new HashMap<>();

        // 1. Dynamic Greeting
        int hour = LocalTime.now().getHour();
        String greeting = (hour < 12) ? "Good morning" : (hour < 17) ? "Good afternoon" : "Good evening";
        response.put("greeting", greeting);
        response.put("studentName", studentName != null ? studentName : "Student");

        // 2. Query Student Enrollments
        List<Enrollment> enrollments = enrollmentRepository.findByUserId(userId);

        // If no enrollments exist yet, seed demo data for this student
        if (enrollments.isEmpty()) {
            enrollments = seedDefaultEnrollments(userId);
        }

        int enrolledCount = enrollments.size();
        int inProgressCount = 0;
        int completedCount = 0;
        int sumProgress = 0;

        List<Map<String, Object>> learningCourses = new ArrayList<>();

        for (Enrollment e : enrollments) {
            Course c = e.getCourse();
            int progress = e.getProgress();
            sumProgress += progress;

            if (progress == 100) {
                completedCount++;
            } else if (progress > 0) {
                inProgressCount++;
                Map<String, Object> courseMap = new HashMap<>();
                courseMap.put("id", c.getId());
                courseMap.put("title", c.getTitle());
                courseMap.put("description", c.getDescription());
                courseMap.put("category", c.getCategory());
                courseMap.put("level", c.getLevel());
                courseMap.put("duration", c.getDuration());
                courseMap.put("lessons", c.getLessons());
                courseMap.put("rating", c.getRating());
                courseMap.put("color", c.getColor());
                courseMap.put("progress", progress);
                learningCourses.add(courseMap);
            }
        }

        int totalProgress = enrolledCount > 0 ? (int) Math.round((double) sumProgress / enrolledCount) : 0;

        response.put("enrolledCourses", enrolledCount);
        response.put("inProgressCourses", inProgressCount);
        response.put("completedCourses", completedCount);
        response.put("totalProgress", totalProgress);
        response.put("attendanceRate", "92%");
        response.put("testsCompleted", 8);
        response.put("learningCourses", learningCourses);

        // 3. Upcoming Activities
        List<UpcomingActivity> upcomingList = upcomingActivityRepository.findTop5ByUserIdOrderByIdDesc(userId);
        List<Map<String, Object>> upcomingMaps = new ArrayList<>();
        for (UpcomingActivity u : upcomingList) {
            Map<String, Object> item = new HashMap<>();
            item.put("title", u.getTitle());
            item.put("course", u.getCourseName());
            item.put("date", u.getDate());
            item.put("time", u.getTime());
            upcomingMaps.add(item);
        }
        response.put("upcomingActivities", upcomingMaps);

        // 4. Recent Activities
        List<RecentActivity> recentList = recentActivityRepository.findTop5ByUserIdOrderByCreatedAtDesc(userId);
        List<Map<String, Object>> recentMaps = new ArrayList<>();
        for (RecentActivity r : recentList) {
            Map<String, Object> item = new HashMap<>();
            item.put("type", r.getType());
            item.put("title", r.getTitle());
            item.put("course", r.getCourseName());
            item.put("time", r.getTimeAgo());
            recentMaps.add(item);
        }
        response.put("recentActivities", recentMaps);

        return response;
    }

    @Transactional
    public void finishLesson(Long userId, Long courseId) {
        enrollmentRepository.findByUserIdAndCourseId(userId, courseId).ifPresent(enrollment -> {
            int newProgress = Math.min(100, enrollment.getProgress() + 10);
            enrollment.setProgress(newProgress);
            if (newProgress == 100) {
                enrollment.setCompleted(true);
            }
            enrollmentRepository.save(enrollment);

            RecentActivity activity = new RecentActivity(
                    userId,
                    "course",
                    "Completed lesson in " + enrollment.getCourse().getTitle(),
                    enrollment.getCourse().getTitle(),
                    "Just now"
            );
            recentActivityRepository.save(activity);
        });
    }

    private List<Enrollment> seedDefaultEnrollments(Long userId) {
        Course c1 = courseRepository.save(new Course(null, "Java Full Stack Development", "Master Core Java, Spring Boot, REST APIs and modern frontend integration.", "Programming", "Intermediate", "40 hours", 32, 4.9, "blue"));
        Course c2 = courseRepository.save(new Course(null, "React & Modern Frontend Architecture", "Build robust single-page applications with React 19, Hooks and state management.", "Web Development", "Intermediate", "28 hours", 24, 4.8, "violet"));
        Course c3 = courseRepository.save(new Course(null, "SQL & Database Design", "Deep dive into SQL querying, indexing, normalization and database architecture.", "Database", "Beginner", "18 hours", 16, 4.7, "green"));

        Enrollment e1 = enrollmentRepository.save(new Enrollment(userId, c1, 75, false));
        Enrollment e2 = enrollmentRepository.save(new Enrollment(userId, c2, 60, false));
        Enrollment e3 = enrollmentRepository.save(new Enrollment(userId, c3, 100, true));

        upcomingActivityRepository.save(new UpcomingActivity(userId, "Java Collections Live Session", "Java Full Stack Development", "Today", "4:00 PM - 5:30 PM"));
        upcomingActivityRepository.save(new UpcomingActivity(userId, "React Custom Hooks Lab", "React & Modern Frontend Architecture", "Tomorrow", "11:00 AM - 12:30 PM"));

        recentActivityRepository.save(new RecentActivity(userId, "course", "Completed Lesson: Spring Security JWT", "Java Full Stack Development", "2 hours ago"));
        recentActivityRepository.save(new RecentActivity(userId, "test", "Scored 88% on SQL Basics Quiz", "SQL & Database Design", "Yesterday"));

        return Arrays.asList(e1, e2, e3);
    }
}