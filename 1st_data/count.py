import pandas as pd

# Load the CSV file
df = pd.read_csv('C:\\Users\\araso\\Documents\\React\\damiina\\registrations 2nd.csv')

# Column containing the course selections
course_column = 'course'

# List of target courses to analyze
target_courses = [
    'Afaan Oromoo',
    'Afaan Ingiliffaa',
    'Afaan Arabaa',
    'Afaan Amhara',
    'Basic Computer Skill and Microsoft 365 Products',
    'Website Development',
    'Mobile App Development',
    'Cryptocurrency',
    'Forex Trading',
    'Digital Marketing(Graphic Design)',
    'Digital Marketing(Video Editing)',
    'Digital Marketing(Social Media Marketing)',
    'Digital Marketing(Amazon Affiliate and Google Ads)'
]

# Count occurrences of each course
course_counts = df[course_column].value_counts()

# Filter and print the counts for the target courses
print("Course Enrollment Counts:")
for course in target_courses:
    count = course_counts.get(course, 0)  # Get count or 0 if course is not present
    print(f"{course}: {count}")
