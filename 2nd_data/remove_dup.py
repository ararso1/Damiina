import csv

# Input and output CSV file names
input_file = "registrations.csv"
output_file = "registrations_unique1.csv"

# Dictionary to track unique emails
unique_emails = {}

# Read the CSV and filter unique entries
with open(input_file, mode='r', encoding='utf-8') as infile:
    reader = csv.DictReader(infile)
    fieldnames = reader.fieldnames

    # Create a list for rows with unique emails
    unique_rows = []
    for row in reader:
        email = row["phone"]
        if email not in unique_emails:
            unique_emails[email] = True
            unique_rows.append(row)

# Write the filtered unique rows to a new CSV file
with open(output_file, mode='w', newline='', encoding='utf-8') as outfile:
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)

    # Write the header
    writer.writeheader()

    # Write the unique rows
    writer.writerows(unique_rows)

print(f"Duplicates removed. Unique entries saved to {output_file}.")
