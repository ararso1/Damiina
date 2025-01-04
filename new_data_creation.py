import pandas as pd
import random
import string

# Load the cleaned data
file_path = "newform.csv"  # Replace with your cleaned data file path
data = pd.read_csv(file_path)

# Function to generate an alphanumeric password
def generate_password(length=10):
    characters = string.ascii_letters + string.digits  # Alphanumeric only
    return ''.join(random.choice(characters) for _ in range(length))

# Create a new DataFrame with required fields
processed_data = data[['Email', 'Maqaa Guutuu', 'Phone Number']].copy()
processed_data['auto_password'] = processed_data['Email'].apply(lambda _: generate_password())
processed_data['groups_id/id'] = 'base.group_portal'  # Add the fixed value for all rows

# Save the processed data to a new CSV file
output_file = "newform processed_users.csv"
processed_data.to_csv(output_file, index=False)

print(f"NewForm Processed data saved to {output_file}")
