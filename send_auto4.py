import smtplib
import pandas as pd
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import re

# Email credentials
sender_email = "areealisho12@gmail.com"
sender_password = "vilx efjr ijrh bpxe"  # Use an App Password for Gmail

# Google Meet link
meet_link = "https://meet.google.com/iwt-xnqp-nyg "

# Load student data from processed file
file_path = "website_development_with_passwords.csv"  # Update with your file path
data = pd.read_csv(file_path)

# Filter students enrolled in "Website Development"
data['email'] = data['email'].str.strip()  # Remove leading/trailing spaces from email
website_development_students = data[data['course'] == 'Website Development']

# Email validation function
def is_valid_email(email):
    """Validates email format using regex"""
    email_pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(email_pattern, email) is not None

# Function to send email
def send_email(to_email, name):
    try:
        # Validate email format
        if not is_valid_email(to_email):
            raise ValueError(f"Invalid email format: {to_email}")

        # Email subject and body
        subject = "Invitation to Join Your Class: Website Development"
        body = f"""
        Dear {name},

        You are invited to attend the first session of the **Website Development** course.  

        **Join the session using the link below:**  
        [Join Google Meet]({meet_link})  

        We look forward to seeing you there!  

        Best regards,  
        **Damiina E-learning Team**
        """

        # Create the email
        message = MIMEMultipart()
        message['From'] = sender_email
        message['To'] = to_email
        message['Subject'] = subject
        message.attach(MIMEText(body, 'plain'))  # Attach the email body as plain text

        # Send the email
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, to_email, message.as_string())
            print(f"Email sent to {name} at {to_email}")

    except Exception as e:
        print(f"Failed to send email to {name} ({to_email}): {e}")

# Send emails to all Website Development students
for index, row in website_development_students.iterrows():
    send_email(row['email'], row['full_name'])

print("All emails for Website Development students have been sent!")
