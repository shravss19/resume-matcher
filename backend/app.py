from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from resume_parser import extract_text
from matcher import calculate_match

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return jsonify({
        "message": "Resume Matcher Backend Running!"
    })

@app.route("/upload", methods=["POST"])
def upload_resume():

    if "resume" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["resume"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    text = extract_text(filepath)

    job_description = request.form.get("jobDescription", "")

    result = calculate_match(text, job_description)

    return jsonify({
        "filename": file.filename,
        "text": text,
        "score": result["score"],
        "matching_skills": result["matching_skills"],
        "missing_skills": result["missing_skills"]
    })

if __name__ == "__main__":
    app.run(debug=True)