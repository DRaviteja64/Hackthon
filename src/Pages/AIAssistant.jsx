import React, { useState, useRef, useEffect } from "react";
import PageHeader from "../Components/PageHeader";
import { Sparkles, Send, Trash2, Bot, User, Lightbulb } from "lucide-react";

const promptResponses = {
  "explain java oop simply": `**Java Object-Oriented Programming (OOP) Pillars:**

1. **Encapsulation:** Wrapping state and behavior inside a class and restricting direct access via private fields with public getters/setters.
2. **Inheritance:** Enabling a child class to inherit fields and methods from a parent class using the \`extends\` keyword (code reusability).
3. **Polymorphism:** Allowing objects to take multiple forms—either compile-time (method overloading) or runtime (method overriding).
4. **Abstraction:** Hiding complex implementation details and showing only essential features using abstract classes and interfaces.

*Tip: In Spring Boot applications, encapsulation and abstraction are fundamental when designing Service and Repository layers.*`,

  "give me 5 sql practice questions": `**Here are 5 SQL interview & practice challenges:**

1. **Find 2nd Highest Salary:**
   \`\`\`sql
   SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);
   \`\`\`
2. **Find Duplicate Records:**
   \`\`\`sql
   SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;
   \`\`\`
3. **Department Highest Earner:**
   \`\`\`sql
   SELECT dept_id, employee_name, salary FROM (
     SELECT *, DENSE_RANK() OVER(PARTITION BY dept_id ORDER BY salary DESC) as rnk FROM employees
   ) t WHERE rnk = 1;
   \`\`\`
4. **Retrieve students who took no exams:**
   \`\`\`sql
   SELECT s.name FROM students s LEFT JOIN exams e ON s.id = e.student_id WHERE e.id IS NULL;
   \`\`\`
5. **Calculate 7-day Moving Average:**
   Use \`AVG(amount) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)\`.`,

  "how does react 19 handle hooks?": `**Key React 19 Innovations & Hooks:**

- **Actions & \`useActionState\`:** Simplifies async forms and pending state without manual \`setIsPending\` flags.
- **\`useOptimistic\`:** Allows instant UI updates during network round-trips for snappy user experiences.
- **\`use\` API:** Reads promises and contexts directly inside components and early returns.
- **Automatic Compiler:** Minimizes the need for manual \`useMemo\` and \`useCallback\` by automatically memoizing expressions during build time!`,

  "create a weekly study plan": `**Recommended 7-Day Student Study Plan:**

- **Monday (Java & OOP):** 2 hours Core Java collections, generics, and stream APIs.
- **Tuesday (Spring Boot & REST):** 2 hours building REST controllers and entity relations.
- **Wednesday (Database & SQL):** 1.5 hours indexing, query performance tuning, and schema design.
- **Thursday (React Frontend):** 2 hours component architecture, state management, and API integration.
- **Friday (Testing & Quality):** 1.5 hours JUnit testing, Jest component tests, and bug fixing.
- **Saturday (Project Build):** 3 hours combining full stack project features.
- **Sunday (Revision & Quizzes):** 1 hour taking portal quizzes and reviewing past results.`
};

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I am your SkillUp AI Study Companion. How can I help you today? Ask me to explain a concept, generate practice questions, debug code, or prepare a study schedule!"
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    // Add user message
    const newMessages = [...messages, { role: "user", text: query }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    // Simulate intelligent reply
    setTimeout(() => {
      const lower = query.toLowerCase();
      let response = "";

      for (const [key, val] of Object.entries(promptResponses)) {
        if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
          response = val;
          break;
        }
      }

      if (!response) {
        if (lower.includes("java")) {
          response = `Java is a statically typed, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. In modern industry, Java 17 and 21 LTS with Spring Boot are standard for building high-throughput microservices.`;
        } else if (lower.includes("react")) {
          response = `React is a declarative, efficient component-based library for building user interfaces. It uses a virtual DOM, unidirectional data flow, and functional components with Hooks to create interactive web applications.`;
        } else if (lower.includes("sql") || lower.includes("database")) {
          response = `Relational databases organize data into tables with defined relations. Key topics to master include normalization (1NF through BCNF), indexing (B-Trees), joins, and ACID transactions.`;
        } else {
          response = `Great question regarding "${query}"! When building full-stack applications, break the problem into modular layers: Database schema design, REST API contracts, business logic services, and responsive UI components. Try exploring our course catalog or taking a quiz on this topic!`;
        }
      }

      setMessages((prev) => [...prev, { role: "assistant", text: response }]);
      setIsTyping(false);
    }, 600);
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        text: "Chat cleared! What topic would you like to explore next?"
      }
    ]);
  };

  return (
    <div className="ai-assistant-page">
      <PageHeader
        title="AI Learning Assistant"
        subtitle="Your personalized 24/7 AI study partner for instant concept explanations, code debugging, and revision quizzes."
        action={
          <button
            type="button"
            className="outline-button flex items-center gap-2"
            onClick={handleClearChat}
          >
            <Trash2 size={16} />
            <span>Clear History</span>
          </button>
        }
      />

      <div className="ai-layout">
        {/* Sidebar suggestions */}
        <aside className="ai-side panel">
          <div className="ai-hero-icon">
            <Sparkles size={28} />
          </div>
          <h3>AI Study Companion</h3>
          <p>
            Ask questions, clarify difficult concepts, review code syntax, or
            create practice quizzes.
          </p>

          <div className="suggestions">
            <b>Suggested Inquiries</b>
            {[
              "Explain Java OOP simply",
              "Give me 5 SQL practice questions",
              "How does React 19 handle hooks?",
              "Create a weekly study plan"
            ].map((s) => (
              <button
                key={s}
                type="button"
                className="suggestion-pill-btn"
                onClick={() => handleSend(s)}
              >
                <Lightbulb size={14} className="sugg-icon" />
                <span>{s}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Chat area */}
        <section className="ai-chat panel">
          <div className="chat-head">
            <div className="ai-hero-icon small">
              <Bot size={18} />
            </div>
            <div className="chat-head-info">
              <b>SkillUp AI Tutor</b>
              <span>Active · Powered by Educational Knowledge Base</span>
            </div>
            <span className="online-dot">Online</span>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-message ${m.role}`}>
                <div className="msg-avatar">
                  {m.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className="msg-bubble">
                  <div className="msg-text" style={{ whiteSpace: "pre-line" }}>
                    {m.text}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message assistant typing">
                <div className="msg-avatar">
                  <Bot size={16} />
                </div>
                <div className="msg-bubble">
                  <div className="typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-compose">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question about Java, React, SQL, Algorithms..."
            />
            <button
              type="button"
              className="send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim()}
            >
              <Send size={18} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
