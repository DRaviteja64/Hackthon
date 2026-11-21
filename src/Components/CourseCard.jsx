import React from "react";
import { ArrowRight, BookOpen, Clock, Star, PlayCircle } from "lucide-react";
import ProgressBar from "./ProgressBar";

export default function CourseCard({ course, explore = false, onAction }) {
  if (!course) return null;

  return (
    <article className="course-card">
      <div className={`course-art ${course.color || "blue"}`}>
        <div className="course-art-icon">
          <BookOpen size={28} />
        </div>
        <span className="course-level">{course.level || "Beginner"}</span>
        <div className="art-decoration" />
      </div>

      <div className="course-card-body">
        <div className="course-category">{course.category || "General"}</div>
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description}</p>

        <div className="course-meta">
          <span>
            <Clock size={14} />
            {course.duration || "Self-paced"}
          </span>
          <span>
            <BookOpen size={14} />
            {course.lessons || 10} lessons
          </span>
          <span>
            <Star size={14} className="star-icon" />
            {course.rating || "4.8"}
          </span>
        </div>

        {!explore && (
          <div className="course-progress">
            <div className="progress-heading">
              <span>Progress</span>
              <b>{course.progress || 0}%</b>
            </div>
            <ProgressBar value={course.progress || 0} color={course.color || "blue"} />
          </div>
        )}

        <button
          type="button"
          className={`course-button ${explore ? "explore-btn" : "continue-btn"}`}
          onClick={() => onAction && onAction(course)}
        >
          {explore ? (
            <>
              <span>View details</span>
              <ArrowRight size={16} />
            </>
          ) : (
            <>
              <PlayCircle size={16} />
              <span>Continue learning</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
