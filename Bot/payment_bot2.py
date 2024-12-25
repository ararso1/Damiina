from telegram import Update, ForceReply
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ConversationHandler, CallbackContext

# Other necessary imports
import psycopg2
import logging

# Logging configuration
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# Database connection details
DB_HOST = 'localhost'
DB_PORT = '5432'
DB_USER = 'your_username'
DB_PASSWORD = 'your_password'
DB_NAME = 'your_database_name'

# Conversation states
FULL_NAME, EMAIL, PHONE_NUMBER, SCREENSHOT = range(4)

def start(update: Update, context: CallbackContext) -> int:
    update.message.reply_text('Welcome to Damiina E-learning! Please enter your full name:')
    return FULL_NAME

def collect_full_name(update: Update, context: CallbackContext) -> int:
    context.user_data['full_name'] = update.message.text
    update.message.reply_text('Thank you! Please enter your email address:')
    return EMAIL

def collect_email(update: Update, context: CallbackContext) -> int:
    context.user_data['email'] = update.message.text
    update.message.reply_text('Great! Now, please enter your phone number:')
    return PHONE_NUMBER

def collect_phone_number(update: Update, context: CallbackContext) -> int:
    context.user_data['phone_number'] = update.message.text
    update.message.reply_text('Awesome! Please upload a screenshot of the payment or any required document:')
    return SCREENSHOT

def collect_screenshot(update: Update, context: CallbackContext) -> int:
    photo_file = update.message.photo[-1].get_file()
    file_path = f'./screenshots/{update.message.from_user.id}.jpg'
    photo_file.download(file_path)
    context.user_data['screenshot_path'] = file_path
    
    try:
        connection = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            dbname=DB_NAME
        )
        cursor = connection.cursor()
        insert_query = """INSERT INTO student_registrations (full_name, email, phone_number, screenshot_path) 
                        VALUES (%s, %s, %s, %s)"""
        data_tuple = (
            context.user_data['full_name'], 
            context.user_data['email'], 
            context.user_data['phone_number'], 
            context.user_data['screenshot_path']
        )
        cursor.execute(insert_query, data_tuple)
        connection.commit()
        cursor.close()
        connection.close()
    
        update.message.reply_text('Thank you for registering! Your information has been saved successfully.')
    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(f"Error while inserting data into PostgreSQL: {error}")
        update.message.reply_text('There was an error saving your information. Please try again later.')
    
    return ConversationHandler.END

def cancel(update: Update, context: CallbackContext) -> int:
    update.message.reply_text('Registration process has been cancelled.')
    return ConversationHandler.END

def main() -> None:
    application = ApplicationBuilder().token("8135272646:AAFjK3wt4t29-hkQPs7w5Nf0WBAdyMfdVYc").build()

    conv_handler = ConversationHandler(
        entry_points=[CommandHandler('start', start)],
        states={
            FULL_NAME: [MessageHandler(filters.TEXT & ~filters.COMMAND, collect_full_name)],
            EMAIL: [MessageHandler(filters.TEXT & ~filters.COMMAND, collect_email)],
            PHONE_NUMBER: [MessageHandler(filters.TEXT & ~filters.COMMAND, collect_phone_number)],
            SCREENSHOT: [MessageHandler(filters.PHOTO & ~filters.COMMAND, collect_screenshot)],
        },
        fallbacks=[CommandHandler('cancel', cancel)],
    )

    application.add_handler(conv_handler)

    application.run_polling()

if __name__ == '__main__':
    main()
