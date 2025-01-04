import smtplib
import pandas as pd
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import re

# Email credentials
sender_email = "areealisho12@gmail.com"
sender_password = "hgam tjuu yodn lfmp"  # Use an App Password for Gmail

# Links and details
website_link = "https://elearning.daminaa.org/slides"
meeting_link = "https://meet.google.com/shq-zmka-pyd"
meeting_date = "Monday, 12/30/2024"

# Load student data from processed file
file_path = "newform processed_users.csv"  # Replace with your file path
data = pd.read_csv(file_path)

# Filter students enrolled in "Forex"
data['Email'] = data['Email'].str.strip()  # Remove leading/trailing spaces from email
# Forex_students = data[data['course'] == 'Forex']

# Validate email format using a regular expression
def is_valid_email(email):
    email_pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(email_pattern, email) is not None

# Function to send email
def send_email(to_email, name, password):
    try:
        if not is_valid_email(to_email):
            raise ValueError(f"Invalid email format: {to_email}")
        subject = "🎉 Welcome to Damiina E-learning - Your Journey Starts Now!"
        body = f"""
        Dear {name},

        Congratulations on being part of the first batch of Damiina E-learning students! We're thrilled to have you with us as you embark on this exciting learning journey.

        **System Login Information:**
        - **Website**: {website_link}
        - **Email**: {to_email}
        - **Password**: {password}

        Once you log in, you can start your course and find all relevant information, including the weekly schedule, under the designated section.

        To get started, please join our introductory meeting tomorrow:
        - **Date**: {meeting_date}
        - **Meeting Link**: {meeting_link}

        We look forward to meeting you and answering any questions you might have.

        Warm regards,  
        The Damiina E-learning Team
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

# Send emails to all Forex students
for index, row in data.iterrows():
    send_email(row['Email'], row['Maqaa Guutuu'], row['auto_password'])

print("All emails for the first batch of Damiina E-learning students have been sent!")
