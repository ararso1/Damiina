import smtplib
import pandas as pd
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Email credentials
sender_email = "arasoalisho2@gmail.com"
sender_password = "duir rboo alel uhjk"  # Use an App Password for Gmail

# Google Meet link
meet_link = "https://calendar.app.google/pXwKYfEkPCjzxiKC7"

# Load student data
file_path = "registrations.csv"  # Replace with your CSV file path
data = pd.read_csv(file_path)

# Function to send email
def send_email(to_email, name):
    subject = "Invitation to Join Orientation for Your First Class"
    body = f"""
    Dear {name},

    You are invited to attend the orientation session for your first class. Attendance is highly recommended.

    Details of the session are as follows:
    - **Date**: Today
    - **Time**: 7:00 PM EAT
    - **Google Meet Link**: {meet_link}

    We look forward to seeing you there!

    Best regards,
    Damiina E-learning Team
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

# Send emails to students starting from index 792
for index, row in data.iterrows():
    if index >= 792:  # Skip rows before index 792
        send_email(row['email'], row['full_name'])

print("All emails have been sent!")
