import re

def calculate_match(resume_text, job_description):
    resume_words = set(re.findall(r'\w+', resume_text.lower()))
    job_words = set(re.findall(r'\w+', job_description.lower()))

    matching = sorted(list(resume_words & job_words))
    missing = sorted(list(job_words - resume_words))

    if len(job_words) == 0:
        score = 0
    else:
        score = int((len(matching) / len(job_words)) * 100)

    return {
        "score": score,
        "matching_skills": matching,
        "missing_skills": missing
    }