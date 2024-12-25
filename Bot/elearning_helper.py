import logging
from telegram import Update, ForceReply
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes

# Enable logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO
)
logger = logging.getLogger(__name__)

# Predefined company info
REGISTRATION_INFO = (
    "To register for Damiina E-learning, visit: https://damiina.vercel.app/course-registration\n"
    "1. Fill in your personal details.\n"
    "2. Choose your preferred course.\n"
    "3. Complete the process and submit.\n"
    "You will receive a confirmation email once registration is complete."
)

DEPARTMENTS_INFO = (
    "List of Damiina E-learning Departments:\n"
    "1. Website Development\n"
    "2. Mobile App Development\n"
    "3. Forex Trading\n"
    "4. Cryptocurrency\n"
    "5. Digital Marketing, which includes:\n"
    "   - Amazon Affiliate Marketing\n"
    "   - Graphic Design\n"
    "   - Video Editing\n"
    "   - Google Ads with Website Content Creation\n"
    "   - Social Media Marketing"
)

CHANGE_DEPARTMENT_INFO = (
    "To change your department, please communicate with your teacher during class time. "
    "They will assist you with the process."
)

SCHEDULE_INFO = (
    "Class schedule updates are posted on our Ibsa Damiina Telegram Channel "
    "(username: @ibsadamiina) and on our website at:\n"
    "https://elearning.daminaa.org under each course."
)

LOGIN_ISSUES_INFO = (
    "For password recovery, click 'Forgot Password' on the login page and follow the instructions.\n"
    "If you need further assistance, contact support via Telegram or email."
)

SUPPORT_INFO = (
    "Contact Support:\n"
    "Telegram: @MRRisqah\n"
    "Email: ararso@daminaa.org"
)

WELCOME_TEXT = (
    "Hello! I'm your Damiina E-learning support bot.\n"
    "Use the commands below to get information:\n\n"
    "/register - How to register for courses\n"
    "/departments - List of departments and sub-courses\n"
    "/change_department - How to change your department\n"
    "/schedule - Where to find class schedules\n"
    "/login_issues - Help with login and password recovery\n"
    "/support - Contact information for support\n"
    "\nFeel free to ask any related questions!"
)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Send a welcome message and a help message."""
    await update.message.reply_text(WELCOME_TEXT)

async def register_info(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Send registration instructions."""
    await update.message.reply_text(REGISTRATION_INFO)

async def departments_info(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Send department information."""
    await update.message.reply_text(DEPARTMENTS_INFO)

async def change_department(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Send instructions on changing department."""
    await update.message.reply_text(CHANGE_DEPARTMENT_INFO)

async def schedule_info(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Send instructions on where to find class schedules."""
    await update.message.reply_text(SCHEDULE_INFO)

async def login_issues(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Send login issues resolution information."""
    await update.message.reply_text(LOGIN_ISSUES_INFO)

async def support_info(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Send support contact information."""
    await update.message.reply_text(SUPPORT_INFO)

async def handle_text(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """
    A basic fallback handler for free-form queries.
    This can be expanded or integrated with a language model to act as an AI assistant.
    """
    user_text = update.message.text.lower()
    # Simple keyword-based responses (you can enhance this logic as needed)
    if "register" in user_text:
        await update.message.reply_text(REGISTRATION_INFO)
    elif "department" in user_text:
        await update.message.reply_text(DEPARTMENTS_INFO + "\n\n" + CHANGE_DEPARTMENT_INFO)
    elif "schedule" in user_text:
        await update.message.reply_text(SCHEDULE_INFO)
    elif "login" in user_text or "password" in user_text:
        await update.message.reply_text(LOGIN_ISSUES_INFO)
    elif "support" in user_text or "contact" in user_text:
        await update.message.reply_text(SUPPORT_INFO)
    else:
        # Default fallback if no keywords matched
        await update.message.reply_text(
            "I'm not sure how to help with that. Try one of the commands:\n"
            "/register, /departments, /change_department, /schedule, /login_issues, /support"
        )

def main():
    # Replace 'YOUR_BOT_TOKEN' with your actual bot token
    application = ApplicationBuilder().token("7851672694:AAGvghez_ClrgPgiUDu8_ogGwiPVgDItLEA").build()

    # Command handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("register", register_info))
    application.add_handler(CommandHandler("departments", departments_info))
    application.add_handler(CommandHandler("change_department", change_department))
    application.add_handler(CommandHandler("schedule", schedule_info))
    application.add_handler(CommandHandler("login_issues", login_issues))
    application.add_handler(CommandHandler("support", support_info))

    # Message handler for free-form text queries
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_text))

    # Start the bot
    application.run_polling()

if __name__ == "__main__":
    main()
