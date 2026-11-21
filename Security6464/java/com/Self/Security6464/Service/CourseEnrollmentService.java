package com.Self.Security6464.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Self.Security6464.Entity.CourseEnrollment;
import com.Self.Security6464.Entity.EnrollmentStatus;
import com.Self.Security6464.Repository.CourseEnrollmentRepository;

@Service
@Transactional
public class CourseEnrollmentService {

    @Autowired
    private CourseEnrollmentRepository enrollmentRepository;

    // STUDENT ENROLLMENT REQUEST
    public CourseEnrollment enrollCourse(
            Integer userId,
            Long courseId
    ) {

        // Check duplicate enrollment
        boolean alreadyEnrolled =
                enrollmentRepository.existsByUserIdAndCourseId(
                        userId,
                        courseId
                );

        if (alreadyEnrolled) {
            throw new RuntimeException(
                    "You have already requested this course."
            );
        }

        CourseEnrollment enrollment = new CourseEnrollment();

        enrollment.setUserId(userId);
        enrollment.setCourseId(courseId);
        enrollment.setStatus(EnrollmentStatus.PENDING);

        return enrollmentRepository.save(enrollment);
    }

    // GET ALL ENROLLMENTS
    public List<CourseEnrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    // GET STUDENT ENROLLMENTS
    public List<CourseEnrollment> getStudentEnrollments(
            Integer userId
    ) {
        return enrollmentRepository.findByUserId(userId);
    }

    // GET COURSE ENROLLMENTS
    public List<CourseEnrollment> getCourseEnrollments(
            Long courseId
    ) {
        return enrollmentRepository.findByCourseId(courseId);
    }

    // GET ENROLLMENTS BY STATUS
    public List<CourseEnrollment> getEnrollmentsByStatus(
            EnrollmentStatus status
    ) {
        return enrollmentRepository.findByStatus(status);
    }

    // APPROVE ENROLLMENT
    public CourseEnrollment approveEnrollment(
            Long enrollmentId
    ) {

        CourseEnrollment enrollment =
                enrollmentRepository.findById(enrollmentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Enrollment not found."
                                )
                        );

        enrollment.setStatus(EnrollmentStatus.APPROVED);

        return enrollmentRepository.save(enrollment);
    }

    // REJECT ENROLLMENT
    public CourseEnrollment rejectEnrollment(
            Long enrollmentId
    ) {

        CourseEnrollment enrollment =
                enrollmentRepository.findById(enrollmentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Enrollment not found."
                                )
                        );

        enrollment.setStatus(EnrollmentStatus.REJECTED);

        return enrollmentRepository.save(enrollment);
    }

    // CANCEL ENROLLMENT
    public CourseEnrollment cancelEnrollment(
            Long enrollmentId
    ) {

        CourseEnrollment enrollment =
                enrollmentRepository.findById(enrollmentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Enrollment not found."
                                )
                        );

        enrollment.setStatus(EnrollmentStatus.CANCELLED);

        return enrollmentRepository.save(enrollment);
    }
}