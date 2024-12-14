import smtplib
import dns.resolver
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email_validator import validate_email, EmailNotValidError

def verify_email(email):
    """
    Verify if the email exists using DNS MX records and SMTP.
    Args:
        email (str): The email to be verified.
    Returns:
        bool: True if the email exists, False otherwise.
    """
    try:
        # Validate email syntax
        valid = validate_email(email)
        email_domain = valid['domain']
        
        # Get MX record of the domain
        mx_records = dns.resolver.resolve(email_domain, 'MX')
        mx_record = str(mx_records[0].exchange)
        
        # Connect to the SMTP server
        server = smtplib.SMTP(timeout=10)
        server.set_debuglevel(0)  # Set to 1 to see debug messages
        server.connect(mx_record)
        server.helo()  # Identify to the server
        server.mail('areealisho12@gmail.com')  # Your email address
        code, message = server.rcpt(email)  # Verify if email exists
        server.quit()
        
        if code == 250:
            print(f"Email {email} exists!")
            return True
        else:
            print(f"Email {email} does NOT exist. Response code: {code}")
            return False
    except (dns.resolver.NoAnswer, dns.resolver.NXDOMAIN, smtplib.SMTPServerDisconnected, smtplib.SMTPConnectError) as e:
        print(f"Error during email verification: {e}")
        return False
    except EmailNotValidError as e:
        print(f"Invalid email format: {e}")
        return False
    except Exception as e:
        print(f"Unexpected error: {e}")
        return False

def send_email(to_email, subject, body, from_email="your_email@example.com", smtp_server="smtp.gmail.com", smtp_port=587, password="your_password"):
    """
    Send an email using an SMTP server.
    Args:
        to_email (str): The recipient email address.
        subject (str): The subject of the email.
        body (str): The body of the email.
        from_email (str): The sender email address.
        smtp_server (str): The SMTP server to connect to.
        smtp_port (int): The port to connect to on the SMTP server.
        password (str): The password for the sender email.
    """
    try:
        # Create the email
        message = MIMEMultipart()
        message['From'] = from_email
        message['To'] = to_email
        message['Subject'] = subject
        
        message.attach(MIMEText(body, 'plain'))
        
        # Connect to the SMTP server
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Upgrade the connection to secure
        server.login(from_email, password)
        server.sendmail(from_email, to_email, message.as_string())
        server.quit()
        
        print(f"Email sent successfully to {to_email}!")
    except smtplib.SMTPException as e:
        print(f"Failed to send email: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

if __name__ == "__main__":
    # Replace the following variables
    recipient_email = "ararso@daminaa.org"
    your_email = "areealisho12@gmail.com"
    your_password = "ervu qssx gbzb xdif"
    subject = "Test Email"
    body = "This is a test email sent using Python!"
    
    # Step 1: Verify if the email exists
    email_exists = verify_email(recipient_email)
    
    if email_exists:
        # Step 2: Send the email if it exists
        send_email(
            to_email=recipient_email,
            subject=subject,
            body=body,
            from_email=your_email,
            smtp_server="smtp.gmail.com",
            smtp_port=587,
            password=your_password
        )
    else:
        print(f"Email {recipient_email} does not exist. Email not sent.")
