import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("SELECT * FROM users LIMIT 5;");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const runQuery = async () => {
    try {
      const res = await axios.post("http://localhost:4000/execute-sql", { query });
      setResult(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Unknown error");
      setResult(null);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">MovieLens SQL Playground</h1>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={6}
        className="w-full p-2 border rounded"
        placeholder="Write your SQL here..."
      />
      <button
        onClick={runQuery}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Run Query
      </button>

      {error && <div className="text-red-600 mt-2">Error: {error}</div>}

      {result && (
        <table className="table-auto border mt-4 w-full">
          <thead>
            <tr>
              {result.columns.map((col) => (
                <th key={col} className="border px-2 py-1 text-left bg-gray-100">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row, i) => (
              <tr key={i}>
                {result.columns.map((col) => (
                  <td key={col} className="border px-2 py-1">
                    {String(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
