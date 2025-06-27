import pandas as pd

# Load both CSV files
file1 = pd.read_csv('registrations.csv')  # first file (source of correct addresses)
file2 = pd.read_csv("C:\\Users\\araso\\Downloads\\payment data - Merged.csv")  # second file (you want to update this)

# Create a dictionary mapping emails to addresses from the first file
email_to_address = dict(zip(file1['email'], file1['address']))

# Update the 'Address' column in file2 based on matching email
file2['Address'] = file2['Email'].map(email_to_address).fillna(file2['Address'])

# Save the updated file2 to a new CSV
file2.to_csv('file2_updated.csv', index=False)

print("Address column updated successfully and saved as 'file2_updated.csv'.")

