import { useState } from "react";
import axios from "axios";

export default function App() {
  const [query, setQuery] = useState("SELECT * FROM users LIMIT 5;");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const runQuery = async () => {
    try {
      const res = await axios.post("https://movielens-backend.onrender.com/execute-sql", { query });
      setResult(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Unknown error");
      setResult(null);
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #ebf8ff, #ffffff, #cfe0f5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
    },
    container: {
      width: "100%",
      maxWidth: "900px",
      padding: "2rem",
      backgroundColor: "white",
      borderRadius: "1rem",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      textAlign: "center",
      color: "#1e40af", // Blue-800
      marginBottom: "1rem",
    },
    textarea: {
      width: "100%",
      padding: "1rem",
      border: "1px solid #93c5fd", // Blue-300
      borderRadius: "0.5rem",
      fontFamily: "monospace",
      fontSize: "1rem",
      marginBottom: "1rem",
    },
    button: {
      backgroundColor: "#2563eb", // Blue-600
      color: "white",
      padding: "0.75rem 1.5rem",
      fontSize: "1.1rem",
      border: "none",
      borderRadius: "0.5rem",
      cursor: "pointer",
      marginBottom: "1rem",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "1rem",
      fontSize: "0.9rem",
    },
    th: {
      backgroundColor: "#dbeafe", // Blue-100
      color: "#1e3a8a", // Blue-900
      padding: "0.5rem",
      border: "1px solid #d1d5db",
      textAlign: "left",
    },
    td: {
      border: "1px solid #d1d5db",
      padding: "0.5rem",
    },
    error: {
      color: "#dc2626", // Red-600
      textAlign: "center",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>MovieLens SQL Playground</h1>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={6}
          style={styles.textarea}
          placeholder="Write your SQL here..."
        />
        <div style={{ textAlign: "center" }}>
          <button onClick={runQuery} style={styles.button}>Run Query</button>
        </div>

        {error && <div style={styles.error}>Error: {error}</div>}

        {result && (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {result.columns.map((col) => (
                    <th key={col} style={styles.th}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#eff6ff" : "white" }}>
                    {result.columns.map((col) => (
                      <td key={col} style={styles.td}>{String(row[col])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
