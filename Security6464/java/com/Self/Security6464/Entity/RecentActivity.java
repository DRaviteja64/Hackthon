package com.Self.Security6464.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "recent_activities")
public class RecentActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String type;       // "course" or "test"
    private String title;      // "Completed Lesson: Spring Security JWT"
    private String courseName; // "Java Full Stack Development"
    private String timeAgo;    // "2 hours ago"
    private LocalDateTime createdAt = LocalDateTime.now();

    public RecentActivity() {}

    public RecentActivity(Long userId, String type, String title, String courseName, String timeAgo) {
        this.userId = userId;
        this.type = type;
        this.title = title;
        this.courseName = courseName;
        this.timeAgo = timeAgo;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public String getTimeAgo() { return timeAgo; }
    public void setTimeAgo(String timeAgo) { this.timeAgo = timeAgo; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}