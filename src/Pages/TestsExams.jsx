import React, { useState } from "react";
import PageHeader from "../Components/PageHeader";
import StatCard from "../Components/StatCard";
import {
  ClipboardList,
  Clock,
  ArrowRight,
  CheckCircle,
  CalendarDays,
  Search,
  FileText,
  Trophy,
  X,
  Award,
  CheckCircle2
} from "lucide-react";

const initialTests = [
  {
    id: 1,
    name: "Java Collections Quiz",
    course: "Java Programming",
    date: "Today · 4:00 PM",
    duration: "15 min",
    questionsCount: 3,
    status: "Upcoming",
    type: "Quiz",
    score: null,
    quizQuestions: [
      {
        q: "Which Collection class guarantees unique elements and sorted natural order?",
        options: ["ArrayList", "TreeSet", "HashSet", "LinkedList"],
        correct: 1
      },
      {
        q: "What is the time complexity of HashMap get() operation on average?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correct: 0
      },
      {
        q: "Which interface does PriorityQueue implement in Java?",
        options: ["List", "Queue", "Set", "Map"],
        correct: 1
      }
    ]
  },
  {
    id: 2,
    name: "React Hooks & Lifecycle Assessment",
    course: "React Development",
    date: "Nov 24 · 11:00 AM",
    duration: "20 min",
    questionsCount: 3,
    status: "Upcoming",
    type: "Assessment",
    score: null,
    quizQuestions: [
      {
        q: "Which hook should you use to run side effects after render in React?",
        options: ["useState", "useEffect", "useMemo", "useRef"],
        correct: 1
      },
      {
        q: "What does the second argument of useEffect represent?",
        options: ["Execution timeout", "Dependency array", "Return handler", "Initial props"],
        correct: 1
      },
      {
        q: "How can you prevent unnecessary re-computations of expensive calculations?",
        options: ["useCallback", "useMemo", "useContext", "useId"],
        correct: 1
      }
    ]
  },
  {
    id: 3,
    name: "Spring Boot Microservices Exam",
    course: "Java Full Stack",
    date: "Nov 26 · 10:00 AM",
    duration: "30 min",
    questionsCount: 3,
    status: "Upcoming",
    type: "Exam",
    score: null,
    quizQuestions: [
      {
        q: "Which annotation marks a class as a Spring Boot entry point?",
        options: ["@SpringBootApplication", "@Service", "@RestController", "@Entity"],
        correct: 0
      },
      {
        q: "What default embedded servlet container does Spring Boot provide?",
        options: ["Tomcat", "Jetty", "Undertow", "Netty"],
        correct: 0
      },
      {
        q: "Which HTTP status code is returned for standard resource creation?",
        options: ["200 OK", "201 Created", "204 No Content", "301 Moved"],
        correct: 1
      }
    ]
  },
  {
    id: 4,
    name: "SQL Queries & Aggregations Test",
    course: "SQL & Database Design",
    date: "Nov 18 · 2:00 PM",
    duration: "25 min",
    questionsCount: 15,
    status: "Completed",
    type: "Quiz",
    score: "88%"
  },
  {
    id: 5,
    name: "HTML5 & CSS Grid Assessment",
    course: "Frontend Development",
    date: "Nov 15 · 11:00 AM",
    duration: "40 min",
    questionsCount: 20,
    status: "Completed",
    type: "Assessment",
    score: "92%"
  }
];

export default function TestsExams() {
  const [testList, setTestList] = useState(initialTests);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Quiz Modal State
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState(null);

  const upcomingCount = testList.filter((t) => t.status === "Upcoming").length;
  const completedCount = testList.filter((t) => t.status === "Completed").length;

  const filteredTests = testList.filter((test) => {
    const matchesFilter =
      activeFilter === "All" || test.status === activeFilter;

    const matchesSearch =
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.course.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleStartTest = (test) => {
    setActiveQuiz(test);
    setUserAnswers({});
    setQuizSubmitted(false);
    setCalculatedScore(null);
  };

  const handleSelectAnswer = (qIndex, optionIndex) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [qIndex]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz?.quizQuestions) return;

    let correctCount = 0;
    activeQuiz.quizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) {
        correctCount++;
      }
    });

    const scorePct = Math.round(
      (correctCount / activeQuiz.quizQuestions.length) * 100
    );
    setCalculatedScore(scorePct);
    setQuizSubmitted(true);

    // Update test list
    setTestList((prev) =>
      prev.map((t) =>
        t.id === activeQuiz.id
          ? { ...t, status: "Completed", score: `${scorePct}%` }
          : t
      )
    );
  };

  return (
    <div className="tests-page">
      <PageHeader
        title="Tests & Assessments"
        subtitle="Challenge your skills, test conceptual knowledge, and unlock verified completion badges."
      />

      {/* Metrics */}
      <div className="stats-grid">
        <StatCard
          icon={ClipboardList}
          label="Available Tests"
          value={upcomingCount}
          caption="Ready to attempt now"
          tone="blue"
        />
        <StatCard
          icon={Clock}
          label="Upcoming"
          value={upcomingCount}
          caption="Scheduled assessments"
          tone="violet"
        />
        <StatCard
          icon={CheckCircle}
          label="Completed"
          value={completedCount}
          caption="Successfully verified"
          tone="green"
        />
        <StatCard
          icon={Trophy}
          label="Total Assessments"
          value={testList.length}
          caption="Across your enrolled courses"
          tone="orange"
        />
      </div>

      {/* Assessment Section */}
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Assessment Curriculum</h2>
            <p>Filter tests by status or search specific topics</p>
          </div>

          <div className="assessment-total">
            <FileText size={17} />
            {testList.length} Assessments
          </div>
        </div>

        {/* Toolbar */}
        <div className="assessment-toolbar">
          <div className="assessment-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search assessments, frameworks or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="assessment-filters">
            {["All", "Upcoming", "Completed"].map((filter) => (
              <button
                key={filter}
                type="button"
                className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Assessment List */}
        <div className="assessment-list">
          {filteredTests.map((test) => (
            <div className="test-row" key={test.id}>
              <div className="test-icon">
                <ClipboardList size={22} />
              </div>

              <div className="test-info">
                <b>{test.name}</b>
                <span>{test.course}</span>

                <div className="test-meta">
                  <span>
                    <CalendarDays size={14} />
                    {test.date}
                  </span>
                  <span>
                    <Clock size={14} />
                    {test.duration}
                  </span>
                  <span>
                    <FileText size={14} />
                    {test.questionsCount} Questions
                  </span>
                  {test.score && (
                    <span className="score-pill">
                      <Award size={14} />
                      Score: {test.score}
                    </span>
                  )}
                </div>
              </div>

              <div className="test-type">{test.type}</div>

              <span className={`status-badge ${test.status.toLowerCase()}`}>
                {test.status}
              </span>

              <button
                type="button"
                className="small-action"
                onClick={() => handleStartTest(test)}
              >
                {test.status === "Completed" ? "Review Results" : "Start Test"}
                <ArrowRight size={15} />
              </button>
            </div>
          ))}

          {filteredTests.length === 0 && (
            <div className="empty-assessment">
              <ClipboardList size={40} />
              <h3>No assessments found</h3>
              <p>Try modifying your search or choosing another filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Quiz / Assessment Modal */}
      {activeQuiz && (
        <div className="modal-backdrop" onClick={() => setActiveQuiz(null)}>
          <div
            className="modal-content quiz-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="modal-kicker">
                  {activeQuiz.course} · {activeQuiz.duration}
                </span>
                <h3>{activeQuiz.name}</h3>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setActiveQuiz(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {quizSubmitted ? (
                <div className="quiz-result-card">
                  <div className="result-badge-circle">
                    <Trophy size={48} />
                  </div>
                  <h3>Assessment Completed!</h3>
                  <p>
                    You scored <b>{calculatedScore}%</b> on {activeQuiz.name}.
                  </p>
                  <div className="result-stats">
                    <span>
                      Outcome:{" "}
                      <b>{calculatedScore >= 70 ? "PASSED" : "NEEDS PRACTICE"}</b>
                    </span>
                    <span>Status: Recorded in Academic Transcript</span>
                  </div>
                </div>
              ) : activeQuiz.quizQuestions ? (
                <div className="quiz-questions-container">
                  <div className="quiz-instructions">
                    Select the best answer for each question and click "Submit
                    Assessment" when done.
                  </div>

                  {activeQuiz.quizQuestions.map((question, qIdx) => (
                    <div className="question-card" key={qIdx}>
                      <div className="question-title">
                        <b>Q{qIdx + 1}.</b> {question.q}
                      </div>
                      <div className="options-grid">
                        {question.options.map((opt, optIdx) => {
                          const isSelected = userAnswers[qIdx] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              type="button"
                              className={`option-btn ${isSelected ? "selected" : ""}`}
                              onClick={() => handleSelectAnswer(qIdx, optIdx)}
                            >
                              <span className="opt-letter">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="review-card">
                  <CheckCircle2 size={44} className="text-green-500 mb-2" />
                  <h4>Assessment Results Reviewed</h4>
                  <p>
                    Final Score: <b>{activeQuiz.score || "88%"}</b>
                  </p>
                  <p>Completed on schedule with passing grade.</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="outline-button"
                onClick={() => setActiveQuiz(null)}
              >
                {quizSubmitted ? "Close" : "Exit"}
              </button>
              {!quizSubmitted && activeQuiz.quizQuestions && (
                <button
                  type="button"
                  className="primary-modal-btn"
                  onClick={handleSubmitQuiz}
                  disabled={
                    Object.keys(userAnswers).length <
                    activeQuiz.quizQuestions.length
                  }
                >
                  Submit Assessment
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
