package com.Self.Security6464.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Self.Security6464.Entity.CourseEnrollment;
import com.Self.Security6464.Service.CourseEnrollmentService;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseEnrollmentController {

    @Autowired
    private CourseEnrollmentService courseEnrollmentService;

    // ==========================================
    // STUDENT ENROLLMENT REQUEST
    // ==========================================

    @PostMapping("/enroll-request")
    public ResponseEntity<?> enrollRequest(
            @RequestBody Map<String, Object> request
    ) {

        try {

            Object courseIdObject = request.get("courseId");
            Object userIdObject = request.get("userId");

            if (courseIdObject == null || userIdObject == null) {

                return ResponseEntity.badRequest().body(
                        Map.of(
                                "success", false,
                                "message", "User ID and Course ID are required."
                        )
                );
            }

            Long courseId = Long.valueOf(courseIdObject.toString());
            Integer userId = Integer.valueOf(userIdObject.toString());

            System.out.println("======================================");
            System.out.println("NEW ENROLLMENT REQUEST");
            System.out.println("User ID: " + userId);
            System.out.println("Course ID: " + courseId);

            CourseEnrollment enrollment =
                    courseEnrollmentService.enrollCourse(userId, courseId);

            System.out.println("Enrollment Successfully Saved!");
            System.out.println("Enrollment ID: " + enrollment.getEnrollmentId());
            System.out.println("Status: " + enrollment.getStatus());
            System.out.println("======================================");

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message", "Enrollment request submitted successfully!",
                            "enrollment", enrollment
                    )
            );

        } catch (RuntimeException e) {

            System.out.println("Enrollment Error: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    Map.of(
                            "success", false,
                            "message", e.getMessage()
                    )
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.badRequest().body(
                    Map.of(
                            "success", false,
                            "message", "Invalid enrollment request."
                    )
            );
        }
    }

    // ==========================================
    // GET STUDENT ENROLLMENTS
    // ==========================================

    @GetMapping("/my-enrollments")
    public ResponseEntity<?> getMyEnrollments(
            @RequestParam Integer userId
    ) {

        System.out.println("======================================");
        System.out.println("MY ENROLLMENTS API CALLED");
        System.out.println("User ID: " + userId);

        try {

            List<CourseEnrollment> enrollments =
                    courseEnrollmentService.getStudentEnrollments(userId);

            System.out.println("Total Enrollments: " + enrollments.size());

            for (CourseEnrollment enrollment : enrollments) {

                System.out.println("--------------------------------------");

                System.out.println(
                        "Enrollment ID: " + enrollment.getEnrollmentId()
                );

                System.out.println(
                        "User ID: " + enrollment.getUserId()
                );

                System.out.println(
                        "Course ID: " + enrollment.getCourseId()
                );

                System.out.println(
                        "Status: " + enrollment.getStatus()
                );

                System.out.println(
                        "Enrollment Date: " + enrollment.getEnrollmentDate()
                );
            }

            System.out.println("MY ENROLLMENTS API COMPLETED");
            System.out.println("======================================");

            return ResponseEntity.ok(enrollments);

        } catch (Exception e) {

            System.out.println("ERROR FETCHING ENROLLMENTS");
            e.printStackTrace();

            return ResponseEntity.internalServerError().body(
                    Map.of(
                            "success", false,
                            "message", "Unable to fetch student enrollments."
                    )
            );
        }
    }
}