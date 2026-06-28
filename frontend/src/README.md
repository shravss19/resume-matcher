# 🚀 AI Resume Matcher & ATS Analyzer

A full-stack web application that analyzes resumes against job descriptions and calculates an ATS compatibility score. The application extracts text from PDF/DOCX resumes, compares technical skills with a job description, and provides an ATS score along with personalized recommendations.

---

## 📌 Features

- 📄 Upload PDF and DOCX resumes
- 🎯 ATS Compatibility Score
- ✅ Technical Skill Matching
- ❌ Missing Skill Detection
- 💡 Resume Improvement Suggestions
- 📊 Modern Dashboard with Circular Score Indicator
- 📱 Responsive User Interface

---

## 🛠️ Tech Stack

### Frontend
- React.js
- CSS3
- Axios

### Backend
- Python
- Flask
- Flask-CORS

### Libraries
- pdfplumber
- python-docx

---

## 📂 Project Structure

```
resume-matcher/
│
├── backend/
│   ├── app.py
│   ├── matcher.py
│   ├── resume_parser.py
│   ├── uploads/
│   └── venv/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/resume-matcher.git
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install flask flask-cors pdfplumber python-docx

python app.py
```

Backend runs at:

```
http://127.0.0.1:5000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 📸 Screenshots

### 🏠 Home Page

![Home](images/home.png)

---

### 🎯 ATS Match Results

![ATS Match Results](images/result.png)

---

### 📊 Suggestions

![Suggestions](images/suggestions.png)

## ✨ Future Improvements

- Authentication
- Resume keyword optimization
- AI-powered resume suggestions
- Multiple resume comparison
- Job recommendation system

---

## 👩‍💻 Author

**Shravani S L**

Information Science & Engineering Student

Passionate about Full Stack Development and AI-based applications.

---

## ⭐ If you found this project useful, consider giving it a star!