import pandas as pd

# Load the cleaned data
file_path = "cleaned_data.csv"  # Replace with your file path
data = pd.read_csv(file_path)

# Filter rows starting from the 1021st row
data = data.iloc[981:]  # Use zero-based indexing, so 1021st row is at index 1020

# Get unique course categories
courses = data['course'].unique()

# Create separate files for each course category
for course in courses:
    course_data = data[data['course'] == course]  # Filter data for this course
    file_name = f"{course.replace(' ', '_')}.csv"  # Use course name as file name (replace spaces with underscores)
    course_data.to_csv(file_name, index=False)
    print(f"File created for course: {course}, saved as {file_name}")

print("Data splitting complete!")
