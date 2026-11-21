import React, { useState } from "react";
import PageHeader from "../Components/PageHeader";
import {
  Award,
  Flame,
  Star,
  Target,
  BookOpen,
  Trophy,
  CheckCircle2,
  Share2,
  X
} from "lucide-react";

const initialBadges = [
  {
    id: 1,
    name: "First Steps",
    desc: "Complete your first lesson and join the learning portal.",
    icon: BookOpen,
    earned: true,
    date: "Earned Nov 12, 2026",
    progress: "100%"
  },
  {
    id: 2,
    name: "Quiz Champion",
    desc: "Score 90% or higher on any certified course assessment.",
    icon: Trophy,
    earned: true,
    date: "Earned Nov 15, 2026",
    progress: "100%"
  },
  {
    id: 3,
    name: "Consistency Star",
    desc: "Study 5 days in a row without breaking your streak.",
    icon: Flame,
    earned: false,
    date: "In progress",
    progress: "4 / 5 days"
  },
  {
    id: 4,
    name: "Course Finisher",
    desc: "Complete 100% of all modules in a certified specialization.",
    icon: Award,
    earned: false,
    date: "In progress",
    progress: "75% completed"
  },
  {
    id: 5,
    name: "Goal Getter",
    desc: "Complete 10 weekly learning objectives and assignments.",
    icon: Target,
    earned: false,
    date: "In progress",
    progress: "7 / 10 goals"
  },
  {
    id: 6,
    name: "Top Performer",
    desc: "Earn 5 distinction test scores with an average above 85%.",
    icon: Star,
    earned: false,
    date: "In progress",
    progress: "3 / 5 tests"
  }
];

export default function Achievements() {
  const [badges] = useState(initialBadges);
  const [filter, setFilter] = useState("all");
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [shared, setShared] = useState(false);

  const earnedCount = badges.filter((b) => b.earned).length;
  const lockedCount = badges.filter((b) => !b.earned).length;

  const filteredBadges = badges.filter((b) => {
    if (filter === "earned") return b.earned;
    if (filter === "locked") return !b.earned;
    return true;
  });

  const handleShare = () => {
    setShared(true);
    setTimeout(() => setShared(false), 1800);
  };

  return (
    <div className="achievements-page">
      <PageHeader
        title="Achievements & Milestones"
        subtitle="Celebrate milestones, unlock badges, and track your gamified learning achievements."
      />

      {/* Summary Big Cards */}
      <div className="achievement-summary">
        <div className="achievement-big">
          <Trophy size={42} className="trophy-gold" />
          <div>
            <b>{earnedCount}</b>
            <span>Badges Earned</span>
          </div>
        </div>

        <div className="achievement-big">
          <Star size={42} className="star-violet" />
          <div>
            <b>{lockedCount}</b>
            <span>To Unlock</span>
          </div>
        </div>

        <div className="achievement-big">
          <Flame size={42} className="flame-orange" />
          <div>
            <b>4 Days</b>
            <span>Current Study Streak</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-pills mb-4">
        <button
          type="button"
          className={`pill ${filter === "all" ? "selected" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Badges ({badges.length})
        </button>
        <button
          type="button"
          className={`pill ${filter === "earned" ? "selected" : ""}`}
          onClick={() => setFilter("earned")}
        >
          Unlocked ({earnedCount})
        </button>
        <button
          type="button"
          className={`pill ${filter === "locked" ? "selected" : ""}`}
          onClick={() => setFilter("locked")}
        >
          Locked / In Progress ({lockedCount})
        </button>
      </div>

      {/* Badge Grid */}
      <div className="achievement-grid">
        {filteredBadges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={`badge-card ${badge.earned ? "earned" : "locked"}`}
              onClick={() => setSelectedBadge(badge)}
            >
              <div className="badge-art">
                <Icon size={32} />
              </div>

              <span className={`badge-status ${badge.earned ? "earned" : "locked"}`}>
                {badge.earned ? "Unlocked ✓" : "In Progress"}
              </span>

              <h3>{badge.name}</h3>
              <p>{badge.desc}</p>

              <div className="badge-footer">
                <small>{badge.progress}</small>
              </div>
            </div>
          );
        })}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="modal-backdrop" onClick={() => setSelectedBadge(null)}>
          <div className="modal-content text-center" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-kicker">ACHIEVEMENT BADGE</span>
                <h3>{selectedBadge.name}</h3>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedBadge(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className={`badge-modal-hero ${selectedBadge.earned ? "earned" : ""}`}>
                <selectedBadge.icon size={60} />
              </div>
              <h4>{selectedBadge.name}</h4>
              <p>{selectedBadge.desc}</p>
              <div className="badge-meta-box">
                <span>Status: <b>{selectedBadge.earned ? "Unlocked" : "Locked"}</b></span>
                <span>Milestone: <b>{selectedBadge.progress}</b></span>
              </div>
            </div>

            <div className="modal-footer justify-center">
              <button
                type="button"
                className="outline-button"
                onClick={() => setSelectedBadge(null)}
              >
                Close
              </button>
              {selectedBadge.earned && (
                <button
                  type="button"
                  className="primary-modal-btn"
                  onClick={handleShare}
                >
                  {shared ? (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={16} />
                      <span>Share Achievement</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
