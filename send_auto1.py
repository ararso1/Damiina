import smtplib
import pandas as pd
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import re

# Email credentials
sender_email = "ararso@daminaa.org"
sender_password = "mvwt lwpe bjkz mtvt"  # Use an App Password for Gmail

# Website and Google Meet links
website_link = "http://elearning.daminaa.org/"
meet_link = "meet.google.com/wnm-hyiw-yey"

# Load student data from processed file
file_path = "Forex_with_passwords.csv"  # Replace with your file path
data = pd.read_csv(file_path)

# Filter students enrolled in "Forex"
data['email'] = data['email'].str.strip()  # Remove leading/trailing spaces from email
forex_students = data[data['course'] == 'Forex']

# Validate email format using a regular expression
def is_valid_email(email):
    email_pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(email_pattern, email) is not None

# Function to send email
def send_email(to_email, name, password):
    try:
        if not is_valid_email(to_email):
            raise ValueError(f"Invalid email format: {to_email}")

        subject = "Invitation to Join Your First Class: Forex Foundation"
        body = f"""
        Dear {name},

        Welcome to the Forex Foundation course! We are excited to invite you to attend the introductory session for your first class. Attendance is mandatory.

        **Session Details:**
        - **Date**: Today, 4/12/2024
        - **Time**: 8:30 PM EAT
        - **Google Meet Link**: {meet_link}

        **System Login Information:**
        - **Website**: {website_link}
        - **Email**: {to_email}
        - **Password**: {password}

        Please log in to the system to access course materials and additional resources.

        We look forward to seeing you there!

        Best regards,  
        Damiina E-learning Team!
        """

        # Create the email
        message = MIMEMultipart()
        message['From'] = sender_email
        message['To'] = to_email
        message['Subject'] = subject
        message.attach(MIMEText(body, 'plain'))

        # Send the email
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, to_email, message.as_string())
            print(f"Email sent to {name} at {to_email}")

    except Exception as e:
        print(f"Failed to send email to {name} ({to_email}): {e}")

# Send emails to all Digital Marketing students
for index, row in forex_students.iterrows():
    send_email("areealisho12@gmail.com", "row['full_name']", "row['auto_password']")

print("All emails for Digital Marketing students have been sent!")
