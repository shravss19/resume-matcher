import { useState } from "react";
import axios from "axios";
import "./App.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [score, setScore] = useState(null);
  const [matchingSkills, setMatchingSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);

  const uploadResume = async () => {
    if (!resume) {
      alert("Please select a resume.");
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

      <div className="hero">
        <h1>AI Resume Matcher & ATS Analyzer</h1>
        <p>
          Analyze your resume against a job description and improve your ATS
          compatibility score.
        </p>
      </div>

      <div className="card">

        <h2>Upload Resume</h2>

        <input
          type="file"
          onChange={(e) => setResume(e.target.files[0])}
        />

        <h2 className="job-title">Job Description</h2>

        <textarea
          rows="8"
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <button className="btn" onClick={uploadResume}>
          ✨ Analyze Resume
        </button>

      </div>

      {score !== null && (

        <div className="card">

          <h2 className="center">ATS Match Score</h2>

          <div className="score-circle">

  <div className="circle">

    <CircularProgressbar
      value={score}
      text={`${score}%`}
      styles={buildStyles({
        textColor: "#2563eb",
        pathColor: "#2563eb",
        trailColor: "#e5e7eb",
        textSize: "18px"
      })}
    />

  </div>

  <h3 className="score-text">
    {score >= 80
      ? "Excellent Match"
      : score >= 60
      ? "Good Match"
      : score >= 40
      ? "Fair Match"
      : "Low Match"}
  </h3>

</div>

          <div className="stats">

            <div className="stat-card">
              <h3>{score}%</h3>
              <p>ATS Score</p>
            </div>

            <div className="stat-card">
              <h3>{matchingSkills.length}</h3>
              <p>Matched Skills</p>
            </div>

            <div className="stat-card">
              <h3>{missingSkills.length}</h3>
              <p>Missing Skills</p>
            </div>

          </div>

          <div className="section">

            <h3>✅ Matching Skills</h3>

            <div className="skills">

              {matchingSkills.length > 0 ? (
                matchingSkills.map((skill, index) => (
                  <div className="skill-match" key={index}>
                    {skill}
                  </div>
                ))
              ) : (
                <p>No matching skills found.</p>
              )}

            </div>

          </div>

          <div className="section">

            <h3>❌ Missing Skills</h3>

            <div className="skills">

              {missingSkills.length > 0 ? (
                missingSkills.map((skill, index) => (
                  <div className="skill-missing" key={index}>
                    {skill}
                  </div>
                ))
              ) : (
                <p>No missing skills.</p>
              )}

            </div>

          </div>

          <div className="section">

            <h3>💡 Suggestions</h3>

            <ul className="suggestions">

              {missingSkills.slice(0, 5).map((skill, index) => (
                <li key={index}>
                  Add <strong>{skill}</strong> to your resume if you have experience with it.
                </li>
              ))}

            </ul>

          </div>

        </div>

      )}
      <footer className="footer">
  Built with ❤️ using React • Flask • Python
</footer>

    </div>
  );
}

export default App;