import pandas as pd
import re

# Load CSV data
file_path = "registrations.csv"  # Replace with your CSV file path
data = pd.read_csv(file_path)

# Define a regex pattern for validating email
email_pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'

# Function to validate email
def is_valid_email(email):
    if pd.isna(email):
        return False  # Handle missing values
    return re.match(email_pattern, email) is not None

# Apply the function to the email column
data['is_valid_email'] = data['email'].apply(is_valid_email)

# Filter only valid emails
valid_emails = data[data['is_valid_email']]

# Drop the helper column for cleaner output
valid_emails = valid_emails.drop(columns=['is_valid_email'])

# Save valid emails to a new CSV
output_file = "valid_emails.csv"
valid_emails.to_csv(output_file, index=False)
print(f"Valid emails saved to {output_file}")

# Optional: Show invalid emails
invalid_emails = data[~data['is_valid_email']]
print("Invalid Emails:")
print(invalid_emails[['email']])
