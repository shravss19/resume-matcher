import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(null);
  const [matchingSkills, setMatchingSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const uploadResume = async () => {
    if (!resume) {
      alert("Please select a resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData
      );

      setResult(response.data.text);
      setScore(response.data.score);
      setMatchingSkills(response.data.matching_skills);
      setMissingSkills(response.data.missing_skills);
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="container">
      <h1 className="title">
🚀 AI Resume Matcher & ATS Analyzer
</h1>

      <div className="card">
        <h2>Upload Resume</h2>

        <input
          type="file"
          onChange={(e) => setResume(e.target.files[0])}
        />
      </div>

      <div className="card">
        <h2>Job Description</h2>

        <textarea
          rows="8"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description..."
        />
      </div>

      <button className="btn" onClick={uploadResume}>
        Analyze Resume
      </button>

      {result && (
        <div className="card">
          <h2>Extracted Resume Text</h2>
          <pre>{result}</pre>
        </div>
      )}
      

{score !== null && (
  <div className="card">
    <h2>ATS Score</h2>

<div className="score">
    {score}%
</div>

<div className="progress">
    <div
        className="progress-bar"
        style={{ width: `${score}%` }}
    ></div>
</div>

    <h3>Matching Skills</h3>
    <div className="skills">
{matchingSkills.map((skill,index)=>(
<div className="skill-match" key={index}>
✅ {skill}
</div>
))}
</div>

    <h3>Missing Skills</h3>
    <div className="skills">
{missingSkills.map((skill,index)=>(
<div className="skill-missing" key={index}>
❌ {skill}
</div>
))}
</div>
  </div>
)}
    </div>
  );
}

export default App;