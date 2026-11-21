package com.Self.Security6464.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    private String category;    // "Programming", "Web Development", etc.
    private String level;       // "Beginner", "Intermediate", "Advanced"
    private String duration;    // "40 hours"
    private Integer lessons;    // 32
    private Double rating;      // 4.9
    private String color;       // "blue", "violet", "green", "orange"

    public Course() {}

    public Course(Long id, String title, String description, String category, String level, String duration, Integer lessons, Double rating, String color) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.level = level;
        this.duration = duration;
        this.lessons = lessons;
        this.rating = rating;
        this.color = color;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public Integer getLessons() { return lessons; }
    public void setLessons(Integer lessons) { this.lessons = lessons; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
}