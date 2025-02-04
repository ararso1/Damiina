import requests
import json
import pandas as pd

# Define the URL for the API endpoint
url = "http://164.92.126.248:8000/csolve_create_user"

# Load user data from CSV file
file_path = "newform processed_users.csv"  # Replace with your CSV file path
data = pd.read_csv(file_path)

# Iterate over each row in the DataFrame and send data to the server
for index, row in data.iterrows():
    # Prepare the payload
    payload = {
        "name": row['Maqaa Guutuu'],        # Use the full_name column for name
        "login": row['Email'],          # Use the email column for login
        "password": row['auto_password'],  # Use the auto_password column for password
        "email": row['Email']           # Use the email column for email
    }
    
    # Set headers
    headers = {
        "Content-Type": "application/json"
    }

    # Send the POST request
    try:
        response = requests.post(url, data=json.dumps(payload), headers=headers)

        # Check response status
        if response.status_code == 200:
            print(f"User '{row['Maqaa Guutuu']}' created successfully.")
            # print("Response:", response.json())  # Assuming the response is in JSON format
        else:
            print(f"Failed to create user '{row['Maqaa Guutuu']}' with status code {response.status_code}")
            print("Error message:", response.text)

    except Exception as e:
        print(f"An error occurred while creating user '{row['Maqaa Guutuu']}': {str(e)}")
print("User creation process completed.")
