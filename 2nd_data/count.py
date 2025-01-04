import csv
from collections import Counter

# Input CSV file name
input_file = "C:\\Users\\araso\\Documents\\React\\damiina\\recent_cleaned_form.csv"

# List of target courses to analyze
target_courses = ["Amazon Affiliate Marketing and Google Ads", "Website Development", "Cryptocurrency", " Forex Trading", "Mobile App Development", "Video Editing", "Graphic Design"]

# Counter to store the number of people for each course
course_count = Counter()
t=0
# Read the CSV file and count occurrences of target courses
with open(input_file, mode='r', encoding='utf-8') as infile:
    reader = csv.DictReader(infile)
    
    for row in reader:
        course = row["Select a course you want? 👇"]
        if course in target_courses:
            course_count[course] += 1
            t+=1

# Print the results
print("Course Enrollment Counts:")
for course in target_courses:
    print(f"{course}: {course_count[course]}")

print("Tot:", t)
