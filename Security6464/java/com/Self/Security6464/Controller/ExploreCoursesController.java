package com.Self.Security6464.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Self.Security6464.Entity.Course;
import com.Self.Security6464.Service.ExploreCourseService;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExploreCoursesController {

    private final ExploreCourseService exploreCourseService;

    public ExploreCoursesController(ExploreCourseService exploreCourseService) {
        this.exploreCourseService = exploreCourseService;
    }

    // Get all courses

    @GetMapping("/explore")
    public ResponseEntity<List<Course>> getAllCourses() {

        List<Course> courses = exploreCourseService.getAllCourses();

        return ResponseEntity.ok(courses);
    }

    // Get course by ID

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {

        Course course = exploreCourseService.getCourseById(id);

        return ResponseEntity.ok(course);
    }
}