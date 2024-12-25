import logging
import os
from telegram import Update, ForceReply
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ConversationHandler, CallbackContext
import psycopg2

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

logger = logging.getLogger(__name__)

# Database connection details
DB_HOST = 'localhost'
DB_PORT = '8000'
DB_USER = 'postgres'
DB_PASSWORD = '1234'
DB_NAME = 'courseregistration'

def create_register_table():
    create_table_query = """
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      phone VARCHAR(15) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      screenshot_path TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    
    try:
        # Establish the connection
        connection = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        
        # Create a cursor object
        cursor = connection.cursor()
        
        # Execute the query to create the table
        cursor.execute(create_table_query)
        
        # Commit the transaction
        connection.commit()
        
        print('Register table is ready.')
        
    except Exception as error:
        print('Error creating register table:', error)
        
    finally:
        # Close the cursor and connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# create_register_table()

# Create the screenshots directory if it doesn't exist
os.makedirs('./screenshots', exist_ok=True)

# Conversation states
FULL_NAME, EMAIL, PHONE_NUMBER, SCREENSHOT = range(4)

# Start command
async def start(update: Update, context: CallbackContext) -> int:
    """Starts the conversation and asks the user for their full name."""
    await update.message.reply_text('Welcome to Damiina E-learning! Please enter your full name:')
    return FULL_NAME

# Collect full name
async def collect_full_name(update: Update, context: CallbackContext) -> int:
    """Stores the user's full name and asks for the email."""
    context.user_data['full_name'] = update.message.text
    await update.message.reply_text('Thank you! Please enter your email address:')
    return EMAIL

# Collect email
async def collect_email(update: Update, context: CallbackContext) -> int:
    """Stores the user's email and asks for the phone number."""
    context.user_data['email'] = update.message.text
    await update.message.reply_text('Great! Now, please enter your phone number:')
    return PHONE_NUMBER

# Collect phone number
async def collect_phone_number(update: Update, context: CallbackContext) -> int:
    """Stores the user's phone number and asks for the screenshot."""
    context.user_data['phone_number'] = update.message.text
    await update.message.reply_text('Awesome! Please upload a screenshot of the payment or any required document:')
    return SCREENSHOT

# Collect screenshot
async def collect_screenshot(update: Update, context: CallbackContext) -> int:
    """Stores the user's screenshot and saves all data to the PostgreSQL database."""
    photo_file = await update.message.photo[-1].get_file()
    file_path = f'./screenshots/{update.message.from_user.id}.jpg'
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    
    await photo_file.download_to_drive(file_path)
    context.user_data['screenshot_path'] = file_path
    
    # Save to the database
    try:
        connection = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            dbname=DB_NAME
        )
        cursor = connection.cursor()
        insert_query = """INSERT INTO payments (full_name, email, phone, screenshot_path) 
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
    
        await update.message.reply_text('Thank you for registering! Your information has been saved successfully.')
    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(f"Error while inserting data into PostgreSQL: {error}")
        await update.message.reply_text('There was an error saving your information. Please try again later.')
    
    return ConversationHandler.END

# Cancel command
async def cancel(update: Update, context: CallbackContext) -> int:
    """Cancels and ends the conversation."""
    await update.message.reply_text('Registration process has been cancelled.')
    return ConversationHandler.END

# Error handler
async def error(update: Update, context: CallbackContext) -> None:
    """Log errors caused by Updates."""
    logger.warning('Update "%s" caused error "%s"', update, context.error)

# Main function to run the bot
def main() -> None:
    """Start the bot."""
    application = ApplicationBuilder().token("8135272646:AAFjK3wt4t29-hkQPs7w5Nf0WBAdyMfdVYc").build()
    
    # Create the conversation handler
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
    application.add_error_handler(error)
    
    application.run_polling()

if __name__ == '__main__':
    main()
