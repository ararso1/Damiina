import pandas as pd

# Load the two datasets
website_development_file = "Cryptocurrency.csv"  # Replace with your file path
processed_users_file = "processed_users_from_1021.csv"  # Replace with your file path

website_data = pd.read_csv(website_development_file)
processed_users_data = pd.read_csv(processed_users_file)

# Merge the datasets on the 'email' column
merged_data = pd.merge(website_data, processed_users_data[['email', 'auto_password']], on='email', how='inner')

# Save the merged data to a new file
output_file = "Cryptocurrency_with_passwords.csv"
merged_data.to_csv(output_file, index=False)

print(f"Merged data saved to {output_file}")
