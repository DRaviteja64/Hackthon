package com.Self.Security6464.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "upcoming_activities")
public class UpcomingActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String title;      // "Java Collections & Streams Live Session"
    private String courseName; // "Java Full Stack Development"
    private String date;       // "Today", "Tomorrow", "Nov 25"
    private String time;       // "4:00 PM - 5:30 PM"

    public UpcomingActivity() {}

    public UpcomingActivity(Long userId, String title, String courseName, String date, String time) {
        this.userId = userId;
        this.title = title;
        this.courseName = courseName;
        this.date = date;
        this.time = time;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
}