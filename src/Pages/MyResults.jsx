import React, { useState } from "react";
import PageHeader from "../Components/PageHeader";
import StatCard from "../Components/StatCard";
import {
  Award,
  ClipboardList,
  Target,
  Download,
  CheckCircle2,
  X,
  FileBadge
} from "lucide-react";

const initialResults = [
  { id: 1, name: "SQL Basics & Aggregations Quiz", course: "SQL & Database Design", score: "88%", date: "Nov 18, 2026", result: "Passed", grade: "A" },
  { id: 2, name: "Java Fundamentals & OOP", course: "Java Programming", score: "92%", date: "Nov 15, 2026", result: "Passed", grade: "A+" },
  { id: 3, name: "React Components & State Management", course: "React Development", score: "76%", date: "Nov 12, 2026", result: "Passed", grade: "B" },
  { id: 4, name: "Python Data Analysis Intro", course: "Python Essentials", score: "84%", date: "Nov 10, 2026", result: "Passed", grade: "A" },
  { id: 5, name: "Web Fundamentals HTML/CSS", course: "Frontend Development", score: "90%", date: "Nov 05, 2026", result: "Passed", grade: "A" }
];

export default function MyResults() {
  const [results] = useState(initialResults);
  const [selectedResult, setSelectedResult] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadCertificate = (res) => {
    setSelectedResult(res);
    setDownloadSuccess(false);
  };

  const handleConfirmDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setSelectedResult(null);
    }, 1500);
  };

  return (
    <div className="results-page">
      <PageHeader
        title="My Results & Academic Performance"
        subtitle="Review certified exam scores, performance milestones, and academic transcripts."
      />

      {/* Metrics */}
      <div className="stats-grid">
        <StatCard
          icon={ClipboardList}
          label="Tests Attempted"
          value={results.length}
          caption="Verified evaluations"
          tone="blue"
        />
        <StatCard
          icon={Target}
          label="Average Score"
          value="86%"
          caption="Across all completed tests"
          tone="green"
        />
        <StatCard
          icon={Award}
          label="Passing Rate"
          value="100%"
          caption="All tests cleared"
          tone="violet"
        />
      </div>

      {/* Results Table Panel */}
      <section className="panel table-panel">
        <div className="panel-heading">
          <div>
            <h2>Verified Test Scores</h2>
            <p>Official course exam results and certificates</p>
          </div>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Assessment</th>
                <th>Course Track</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Attempt Date</th>
                <th>Result</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id}>
                  <td>
                    <b>{r.name}</b>
                  </td>
                  <td>{r.course}</td>
                  <td>
                    <strong className="score-highlight">{r.score}</strong>
                  </td>
                  <td>
                    <span className="grade-badge">{r.grade}</span>
                  </td>
                  <td>{r.date}</td>
                  <td>
                    <span className="status-badge completed">{r.result}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="download-pill-btn"
                      onClick={() => handleDownloadCertificate(r)}
                    >
                      <Download size={14} />
                      <span>Certificate</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Certificate Preview Modal */}
      {selectedResult && (
        <div className="modal-backdrop" onClick={() => setSelectedResult(null)}>
          <div className="modal-content certificate-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-kicker">OFFICIAL CREDENTIAL</span>
                <h3>Certificate of Achievement</h3>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedResult(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body text-center">
              <div className="cert-preview-card">
                <FileBadge size={54} className="cert-icon" />
                <h2>Certificate of Excellence</h2>
                <p>This certifies that the student has successfully demonstrated competency in:</p>
                <h3>{selectedResult.name}</h3>
                <p>Course: <b>{selectedResult.course}</b></p>
                <div className="cert-meta-row">
                  <span>Score: <b>{selectedResult.score}</b> (Grade {selectedResult.grade})</span>
                  <span>Issued: <b>{selectedResult.date}</b></span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="outline-button"
                onClick={() => setSelectedResult(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="primary-modal-btn"
                onClick={handleConfirmDownload}
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    <span>Download PDF Certificate</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
