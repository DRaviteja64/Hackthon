package com.Self.Security6464.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Self.Security6464.Entity.Course;
import com.Self.Security6464.Repository.CourseRepository;

@Service
public class ExploreCourseService {

    private final CourseRepository courseRepository;

    public ExploreCourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Transactional(readOnly = true)
    public List<Course> getAllCourses() {

        return courseRepository.findAll();

    }

    @Transactional(readOnly = true)
    public Course getCourseById(Long id) {

        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

    }
}