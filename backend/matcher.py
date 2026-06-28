import re

# Technical and soft skills dictionary
SKILLS = {
    "python",
    "java",
    "c",
    "c++",
    "javascript",
    "react",
    "flask",
    "django",
    "html",
    "css",
    "bootstrap",
    "tailwind",
    "node",
    "express",
    "sql",
    "mysql",
    "mongodb",
    "git",
    "github",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "rest",
    "api",
    "apis",
    "rest api",
    "data structures",
    "algorithms",
    "oop",
    "communication",
    "teamwork",
    "problem solving",
    "problem-solving",
    "leadership",
    "machine learning",
    "deep learning",
    "tensorflow",
    "pandas",
    "numpy"
}


def extract_skills(text):
    text = text.lower()

    found_skills = set()

    # Treat REST API as one skill
    if "rest api" in text or "rest apis" in text:
        found_skills.add("REST API")

    # Match multi-word skills
    for skill in SKILLS:
        if skill in {"rest", "api", "apis", "rest api"}:
            continue

        if " " in skill:
            if skill in text:
                found_skills.add(skill.title())

    # Match single-word skills
    words = set(re.findall(r"\b[a-zA-Z+#]+\b", text))

    for word in words:
        if word in SKILLS and word not in {"rest", "api", "apis"}:
            found_skills.add(word.title())

    return found_skills


def calculate_match(resume_text, job_description):

    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_description)

    matching = sorted(resume_skills & job_skills)
    missing = sorted(job_skills - resume_skills)

    if len(job_skills) == 0:
        score = 0
    else:
        score = round((len(matching) / len(job_skills)) * 100)

    return {
        "score": score,
        "matching_skills": matching,
        "missing_skills": missing
    }