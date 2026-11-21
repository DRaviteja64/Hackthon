package com.Self.Security6464.Controller;

import java.security.Principal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Self.Security6464.Service.OverviewService;

@RestController
@RequestMapping("/api/overview")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class OverviewController {

    @Autowired
    private OverviewService overviewService;

    /**
     * GET /api/overview?userId=1
     * Supplies all data needed by Overview.jsx
     */
//    @GetMapping
//    public ResponseEntity<Map<String, Object>> getOverview(
//            @RequestParam(defaultValue = "1") Long userId,
//            Principal principal
//    ) {
//        String studentName = (principal != null) ? principal.getName() : "Student";
//        Map<String, Object> data = overviewService.getOverviewData(userId, studentName);
//        return ResponseEntity.ok(data);
//    }

    /**
     * POST /api/overview/lesson/finish?userId=1&courseId=1
     * Called when clicking "Mark as Finished" in Overview.jsx modal
     */
    @PostMapping("/lesson/finish")
    public ResponseEntity<Map<String, String>> finishLesson(

            @RequestParam Long userId,
            @RequestParam Long courseId,
            Principal principal

    ) {

        System.out.println("========== FINISH LESSON API CALLED ==========");

        System.out.println("User ID: " + userId);
        System.out.println("Course ID: " + courseId);

        System.out.println("JWT Principal: " +
                (principal != null ? principal.getName() : "NULL"));

        overviewService.finishLesson(userId, courseId);

        System.out.println("Lesson Finished Successfully");

        System.out.println("==============================================");

        return ResponseEntity.ok(
                Map.of("message", "Lesson marked as finished successfully!")
        );
    }
    @GetMapping
    public ResponseEntity<Map<String, Object>> getOverview(

            @RequestParam(defaultValue = "1") Long userId,
            Principal principal

    ) {

        System.out.println("========== OVERVIEW API CALLED ==========");

        System.out.println("Requested User ID: " + userId);

        System.out.println("JWT Principal: " +
                (principal != null ? principal.getName() : "NULL"));

        Map<String, Object> data =
                overviewService.getOverviewData(userId,
                        principal != null ? principal.getName() : "Student");

        System.out.println("Overview Data Generated Successfully");

        System.out.println("==========================================");

        return ResponseEntity.ok(data);
    }
}