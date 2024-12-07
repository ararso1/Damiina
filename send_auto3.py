import smtplib
import pandas as pd
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import re
import time

# Email credentials
# sender_email = "ararso@daminaa.org"
# sender_password = "gwgf btwa tuay qojg"  # App Password for Google Workspace

sender_email = "areealisho12@gmail.com"
sender_password = "vilx efjr ijrh bpxe"  # Use an App Password for Gmail

# Links
website_link = "http://elearning.daminaa.org/"
meet_link = "meet.google.com/hzo-bbay-wki"

# Load student data from processed file
file_path = "website_development_with_passwords.csv"  # Update with your file path
data = pd.read_csv(file_path)

# Filter students enrolled in "Forex"
data['email'] = data['email'].str.strip()  # Clean up email field
Forex_students = data[data['course'] == 'Website Development']

# Email validation function
def is_valid_email(email):
    email_pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(email_pattern, email) is not None

# Function to send email
def send_email(to_email, name, password):
    try:
        if not is_valid_email(to_email):
            raise ValueError(f"Invalid email format: {to_email}")

        subject = "Invitation to Join Your First Class: Mobile App Development"
        body = f"""
        <html>
        <body>
            <p>Dear {name},</p>
            <p>Welcome to the <strong>Mobile App Development</strong> course! We are excited to invite you to attend the introductory session for your first class. Attendance is mandatory.</p>
            <h3>Session Details:</h3>
            <ul>
                <li><strong>Date:</strong> Today, 5/12/2024</li>
                <li><strong>Time:</strong> 7:30 PM EAT</li>
                <li><strong>Google Meet Link:</strong> <a href="{meet_link}">{meet_link}</a></li>
            </ul>
            <h3>System Login Information:</h3>
            <ul>
                <li><strong>Website:</strong> <a href="{website_link}">{website_link}</a></li>
                <li><strong>Email:</strong> {to_email}</li>
                <li><strong>Password:</strong> {password}</li>
            </ul>
            <p>Please log in to the system to access course materials and additional resources.</p>
            <p>We look forward to seeing you there!</p>
            <p>Best regards,</p>
            <p><strong>Damiina E-learning Team!</strong></p>
        </body>
        </html>
        """

        # Create the email
        message = MIMEMultipart()
        message['From'] = sender_email
        message['To'] = to_email
        message['Subject'] = subject
        message.attach(MIMEText(body, 'html'))

        # Send the email
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, to_email, message.as_string())
            print(f"Email sent to {name} at {to_email}")

    except Exception as e:
        print(f"Failed to send email to {name} ({to_email}): {e}")

# Send emails to all Forex students
for index, row in Forex_students.iterrows():
    if index>=238:
        send_email(row['email'], row['full_name'], row['auto_password'])
    # time.sleep(2)  # Optional: Delay to avoid hitting rate limits
    
print("All emails for Forex students have been sent!")
