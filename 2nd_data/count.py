import csv
from collections import Counter

# Input CSV file name
input_file = "registrations.csv"

# List of target courses to analyze
target_courses = ["Digital Marketing", "Website Development", "Cryptocurrency", "Forex", "Mobile App Development"]

# Counter to store the number of people for each course
course_count = Counter()

# Read the CSV file and count occurrences of target courses
with open(input_file, mode='r', encoding='utf-8') as infile:
    reader = csv.DictReader(infile)
    for row in reader:
        course = row["course"]
        if course in target_courses:
            course_count[course] += 1

# Print the results
print("Course Enrollment Counts:")
for course in target_courses:
    print(f"{course}: {course_count[course]}")
