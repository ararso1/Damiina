import pandas as pd
import re

# Load CSV data
file_path = "recent form.csv"  # Replace with your file path
data = pd.read_csv(file_path)

# Function to validate email
def is_valid_email(email):
    email_pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    if pd.isna(email):
        return False
    return re.match(email_pattern, email) is not None

# Function to validate phone
def is_valid_phone(phone):
    phone_pattern = r'^\+?[0-9]{7,15}$'  # Accepts optional '+' and 7-15 digits
    if pd.isna(phone):
        return False
    return re.match(phone_pattern, str(phone)) is not None

# Perform basic cleaning
data = data.drop_duplicates()  # Remove duplicate rows
# data = data.dropna(subset=['email', 'phone', 'full_name'])  # Drop rows with missing critical data
# data['full_name'] = data['full_name'].str.strip()  # Clean leading/trailing spaces
# data['email'] = data['email'].str.strip()
# data['phone'] = data['phone'].astype(str).str.strip()

# # Apply validation
# data['valid_email'] = data['email'].apply(is_valid_email)
# data['valid_phone'] = data['phone'].apply(is_valid_phone)

# # Filter valid rows
# cleaned_data = data[data['valid_email'] & data['valid_phone']]

# # Drop validation columns for cleaner output
# cleaned_data = cleaned_data.drop(columns=['valid_email', 'valid_phone'])

# Save cleaned data to a new CSV file
output_file = "recent_cleaned_form.csv"
cleaned_data = data
cleaned_data.to_csv(output_file, index=False)

print(f"Cleaned data saved to {output_file}")
