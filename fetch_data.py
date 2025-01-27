import requests
import csv

# API endpoint
url = "https://damiina.onrender.com/api/registrations"

# Fetch data from the API
response = requests.get(url)

if response.status_code == 200:
    # Parse JSON data
    data = response.json()

    # Specify CSV file name
    csv_file = "registrations 2nd.csv"

    # Open the CSV file for writing
    with open(csv_file, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)

        # Write the header
        headers = [
            "id",
            "full_name",
            "phone",
            "email",
            "address",
            "age",
            "gender",
            "education",
            "degree_or_masters",
            "course",
            "additional_info",
            "created_at"
        ]
        writer.writerow(headers)

        # Write the data rows
        for record in data:
            writer.writerow([
                record["id"],
                record["full_name"],
                record["phone"],
                record["email"],
                record["address"],
                record["age"],
                record["gender"],
                record["education"],
                record["degree_or_masters"],
                record["course"],
                record["additional_info"],
                record["created_at"]
            ])
    
    print(f"Data successfully saved to {csv_file}")
else:
    print(f"Failed to fetch data. Status code: {response.status_code}")
