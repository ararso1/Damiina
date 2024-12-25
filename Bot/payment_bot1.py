import logging
import os
from telegram import Update, ReplyKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, CallbackContext, ConversationHandler

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# Telegram Bot Token
BOT_TOKEN = '8135272646:AAFjK3wt4t29-hkQPs7w5Nf0WBAdyMfdVYc'  # Replace with your Bot Token from BotFather

# Conversation states
FULL_NAME, EMAIL, PHONE, SCREENSHOT = range(4)


def start(update: Update, context: CallbackContext) -> int:
    """Start the bot and ask for the user's full name"""
    update.message.reply_text(
        "Welcome to Damiina E-learning Registration Bot!\n\nPlease enter your full name to get started:",
    )
    return FULL_NAME


def get_full_name(update: Update, context: CallbackContext) -> int:
    """Store the user's full name and ask for their email"""
    user = update.message.from_user
    context.user_data['full_name'] = update.message.text
    logger.info("Full Name of %s: %s", user.first_name, update.message.text)
    update.message.reply_text(
        "Great, now please enter your email address:",
    )
    return EMAIL


def get_email(update: Update, context: CallbackContext) -> int:
    """Store the user's email and ask for their phone number"""
    user = update.message.from_user
    context.user_data['email'] = update.message.text
    logger.info("Email of %s: %s", user.first_name, update.message.text)
    update.message.reply_text(
        "Awesome! Now enter your phone number:",
    )
    return PHONE


def get_phone(update: Update, context: CallbackContext) -> int:
    """Store the user's phone number and ask for their screenshot"""
    user = update.message.from_user
    context.user_data['phone'] = update.message.text
    logger.info("Phone Number of %s: %s", user.first_name, update.message.text)
    update.message.reply_text(
        "Finally, please upload a screenshot of your payment:",
    )
    return SCREENSHOT


def get_screenshot(update: Update, context: CallbackContext) -> int:
    """Store the screenshot and save all user data to local file"""
    user = update.message.from_user
    photo_file = update.message.photo[-1].get_file()
    photo_path = f"{user.id}_payment_screenshot.jpg"
    
    photo_file.download(photo_path)
    logger.info("Screenshot of %s: %s", user.first_name, photo_path)
    
    # Store screenshot URL
    photo_url = photo_file.file_path
    context.user_data['screenshot'] = photo_url
    
    # Save data to a local file
    full_name = context.user_data['full_name']
    email = context.user_data['email']
    phone = context.user_data['phone']
    screenshot_url = photo_url
    
    try:
        with open('registration_data.csv', 'a') as file:
            file.write(f"{full_name},{email},{phone},{screenshot_url}\n")
        update.message.reply_text(
            "Thank you for registering! Your details have been saved successfully.",
        )
    except Exception as e:
        logger.error("Failed to save data: %s", str(e))
        update.message.reply_text(
            "There was an error saving your data. Please try again later.",
        )
    
    return ConversationHandler.END


def cancel(update: Update, context: CallbackContext) -> int:
    """Cancel the conversation"""
    user = update.message.from_user
    logger.info("User %s canceled the conversation.", user.first_name)
    update.message.reply_text(
        "Registration canceled. See you next time!",
    )
    return ConversationHandler.END


def main() -> None:
    """Start the bot"""
    application = Application.builder().token(BOT_TOKEN).build()
    
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler('start', start)],
        states={
            FULL_NAME: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_full_name)],
            EMAIL: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_email)],
            PHONE: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_phone)],
            SCREENSHOT: [MessageHandler(filters.PHOTO, get_screenshot)],
        },
        fallbacks=[CommandHandler('cancel', cancel)],
    )
    
    application.add_handler(conv_handler)
    
    application.run_polling()


if __name__ == '__main__':
    main()
