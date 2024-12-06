import pandas as pd
import random
import string

# Load the cleaned data
file_path = "cleaned_data.csv"  # Replace with your file path
data = pd.read_csv(file_path)

# Filter rows starting from the 1021st row
data = data.iloc[981:]  # Use zero-based indexing, so 1021st row is at index 1020

# Function to generate random alphanumeric passwords
def generate_password(length=10):
    characters = string.ascii_letters + string.digits  # Alphanumeric only
    return ''.join(random.choice(characters) for _ in range(length))

# Create a new DataFrame with required fields
processed_data = data[['email', 'full_name']].copy()
processed_data['auto_password'] = processed_data['email'].apply(lambda _: generate_password())
processed_data['groups_id/id'] = 'base.group_portal'  # Fixed value for all rows

# Save the new data to a CSV file
output_file = "processed_users_from_1021.csv"
processed_data.to_csv(output_file, index=False)

print(f"Processed file created: {output_file}")
