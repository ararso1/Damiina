import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import pandas as pd
import re

# Email credentials
sender_email = "ararso@daminaa.org"
sender_password = "tmmw xxcw kfvm lmgr"  # App Password for Google Workspace

# Links
website_link = "http://elearning.daminaa.org/"
meet_link = "meet.google.com/qsi-anfn-tgi"

# Load student data from processed file
file_path = "test.csv"  # Update with your file path
data = pd.read_csv(file_path)
print(data)
# Filter students enrolled in "Forex"
data['email'] = data['email'].str.strip()  # Clean up email field
Forex_students = data[data['course'] == 'Forex']

# Validate email format using a regular expression
def is_valid_email(email):
    email_pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(email_pattern, email) is not None

# Collect valid email addresses and personalized information
valid_recipients = []
personalized_info = []  # For tracking name and password for logging or follow-up

for index, row in Forex_students.iterrows():
    email = row['email']
    if is_valid_email(email):
        valid_recipients.append(email)
        personalized_info.append((row['full_name'], row['auto_password']))

# Function to send email
def send_bulk_email(recipients, personalized_info):
    try:
        if not recipients:
            raise ValueError("No valid email recipients found.")

        subject = "Invitation to Join Your First Class: Forex Foundation"
        body = f"""
        <html>
        <body>
            <p>Dear Student,</p>
            <p>Welcome to the <strong>Forex Foundation</strong> course! We are excited to invite you to attend the introductory session for your first class. Attendance is mandatory.</p>
            <h3>Session Details:</h3>
            <ul>
                <li><strong>Date:</strong> Today, 4/12/2024</li>
                <li><strong>Time:</strong> 7:30 PM EAT</li>
                <li><strong>Google Meet Link:</strong> <a href="{meet_link}">{meet_link}</a></li>
            </ul>
            <h3>System Login Information:</h3>
            <ul>
                <li><strong>Website:</strong> <a href="{website_link}">{website_link}</a></li>
                <li><strong>Email:</strong> (Use your email address)</li>
                <li><strong>Password:</strong> (Personalized password provided)</li>
            </ul>
            <p>Please log in to the system to access course materials and additional resources.</p>
            <p>We look forward to seeing you there!</p>
            <p>Best regards,</p>
            <p><strong>Damiina E-learning Team</strong></p>
        </body>
        </html>
        """

        # Create the email
        message = MIMEMultipart()
        message['From'] = sender_email
        message['To'] = sender_email  # Use sender's email as 'To' for bulk BCC
        message['Subject'] = subject
        message.attach(MIMEText(body, 'html'))

        # Add recipients in BCC
        message['Bcc'] = ", ".join(recipients)

        # Send the email
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipients, message.as_string())
            print(f"Email sent to {len(recipients)} recipients successfully.")

    except Exception as e:
        print(f"Failed to send bulk email: {e}")

# Call the bulk email function
send_bulk_email(valid_recipients, personalized_info)
