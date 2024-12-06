import pandas as pd

# Load the CSV file
df = pd.read_csv('C:\\Users\\araso\\Documents\\React\\damiina\\1st_data\\first_data.csv')

# Column containing the course selections
course_column = 'Select a course you want'

# List of target courses to analyze
target_courses = [
    'Digital Marketing',
    'Website Development',
    'Cryptocurrency',
    'Forex',
    'Mobile App Development'
]

# Count occurrences of each course
course_counts = df[course_column].value_counts()

# Filter and print the counts for the target courses
print("Course Enrollment Counts:")
for course in target_courses:
    count = course_counts.get(course, 0)  # Get count or 0 if course is not present
    print(f"{course}: {count}")
