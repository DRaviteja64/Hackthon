package com.Self.Security6464.Repository;

import com.Self.Security6464.Entity.CourseEnrollment;
import com.Self.Security6464.Entity.EnrollmentStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseEnrollmentRepository
        extends JpaRepository<CourseEnrollment, Long> {

    // Get all enrollments for a student
    List<CourseEnrollment> findByUserId(Integer userId);

    // Get all enrollments for a course
    List<CourseEnrollment> findByCourseId(Long courseId);

    // Find enrollment using student ID and course ID
    Optional<CourseEnrollment> findByUserIdAndCourseId(
            Integer userId,
            Long courseId
    );

    // Check duplicate enrollment
    boolean existsByUserIdAndCourseId(
            Integer userId,
            Long courseId
    );

    // Get enrollments by status
    List<CourseEnrollment> findByStatus(EnrollmentStatus status);
}