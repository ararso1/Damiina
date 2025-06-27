import pandas as pd
import os

def classify_file_by_course(input_file):
    # Determine file extension
    file_ext = os.path.splitext(input_file)[-1].lower()
    
    # Read the file based on its extension
    if file_ext == ".csv":
        df = pd.read_csv(input_file)
    elif file_ext in [".xlsx", ".xls"]:
        df = pd.read_excel(input_file)
    else:
        raise ValueError("Unsupported file format. Please provide a CSV or Excel file.")
    
    # Ensure the column name is correctly referenced
    course_column = "Select a course you want? 👇"
    
    if course_column not in df.columns:
        raise KeyError(f"Column '{course_column}' not found in the file.")
    
    # Group by the course column and create separate CSV files
    for course, group in df.groupby(course_column):
        # Create a valid filename
        filename = f"{course.replace(' ', '_')}.csv"
        group.to_csv(filename, index=False)
        print(f"Created: {filename}")

# Example usage
input_file = "C:\\Users\\araso\\Documents\\React\\damiina\\payment data.xlsx"  # Change this to your actual file name
classify_file_by_course(input_file)
