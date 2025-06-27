import pandas as pd

def classify_csv_by_course(input_file):
    # Read the CSV file
    df = pd.read_csv(input_file)
    
    # Ensure the column name is correctly referenced
    course_column = "course"
    
    # Group by the course column and create separate CSV files
    for course, group in df.groupby(course_column):
        # Create a valid filename
        filename = f"{course.replace(' ', '_')}.csv"
        group.to_csv(filename, index=False)
        print(f"Created: {filename}")

# Example usage
input_csv = "C:\\Users\\araso\\Documents\\React\\damiina\\registrations 2nd.csv"  # Change this to your actual file name
classify_csv_by_course(input_csv)