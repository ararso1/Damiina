import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    CallbackQueryHandler,
    ContextTypes,
)

# Enable logging for debugging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)


# --- START HANDLER (async) ---
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """
    Sends a welcome message with the main buttons.
    """
    welcome_text = (
        "Welcome to Wonderful Trading! We're delighted to have you here. How can we assist you today? Explore our wide range of services and let us know how we can meet your needs!\n\n"
        "Please choose an option below:"
    )

    # Inline keyboard for main menu
    keyboard = [
        [
            InlineKeyboardButton("Services", callback_data="services"),
            InlineKeyboardButton("Contacts", callback_data="contacts"),
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    # Always use 'await' when sending messages in an async function
    await update.message.reply_text(text=welcome_text, reply_markup=reply_markup)


async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """
    Handles button clicks from the inline keyboard.
    """
    query = update.callback_query
    # Acknowledge the callback to remove the 'loading' state on the button
    await query.answer()

    # Define the "Back" and "Contact" buttons
    back_contact_keyboard = [
        [
            InlineKeyboardButton("Back", callback_data="services"),
            InlineKeyboardButton("Contact", callback_data="contacts"),
        ]
    ]

    if query.data == "services":
        # Show the list of main services
        keyboard = [
            [
                InlineKeyboardButton("1. Printing", callback_data="printing"),
                InlineKeyboardButton("2. Interior Design", callback_data="interior"),
            ],
            [
                InlineKeyboardButton("3. Garments & Textile", callback_data="garments"),
                InlineKeyboardButton("4. Consultancy", callback_data="consultancy"),
            ],
            [
                InlineKeyboardButton("5. Sales Products", callback_data="sales"),
                InlineKeyboardButton("6. Innovation Idea", callback_data="Innovation"),
            ],
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await query.edit_message_text(
            text="Here are our main services. Choose one:",
            reply_markup=reply_markup
        )

    elif query.data == "contacts":
        # Provide contact information
        contact_text = (
            "You can reach us at:\n"
            "• **Phone**: +251930291939\n"
            "• **Email**: info@ayitc.org\n"
            "• **Telegram**: https://t.me/ayitcorg\n"
            "• **Website**: www.ayitc.org\n"
            "• **Address**: 123 Business Street, City\n\n"
            "Thank you for contacting Wonderful Trading!"
        )
        await query.edit_message_text(text=contact_text, parse_mode="Markdown")

    elif query.data == "printing":
        sub_services_text = (
            "Our Printing Services:\n"
            "• Offset Printing\n"
            "• Digital Printing\n"
            "• Large Format Printing\n\n"
            "Please let us know what specific printing you need."
        )
        reply_markup = InlineKeyboardMarkup(back_contact_keyboard)
        await query.edit_message_text(text=sub_services_text, reply_markup=reply_markup)

    elif query.data == "interior":
        sub_services_text = (
            "Our Interior Design Services:\n"
            "• Office Interior\n"
            "• Home Interior\n"
            "• Commercial Spaces\n\n"
            "Please let us know how we can help with your interior design needs."
        )
        reply_markup = InlineKeyboardMarkup(back_contact_keyboard)
        await query.edit_message_text(text=sub_services_text, reply_markup=reply_markup)

    elif query.data == "garments":
        sub_services_text = (
            "Our Garments & Textile Services:\n"
            "• Fabric Supply\n"
            "• Custom Uniforms\n"
            "• Apparel Branding\n\n"
            "Please let us know your garments and textile requirements."
        )
        reply_markup = InlineKeyboardMarkup(back_contact_keyboard)
        await query.edit_message_text(text=sub_services_text, reply_markup=reply_markup)

    elif query.data == "consultancy":
        sub_services_text = (
            "Our Consultancy Services:\n"
            "• Business Strategy\n"
            "• Marketing & Branding\n"
            "• Project Management\n\n"
            "Please let us know how we can assist you."
        )
        reply_markup = InlineKeyboardMarkup(back_contact_keyboard)
        await query.edit_message_text(text=sub_services_text, reply_markup=reply_markup)

    elif query.data == "sales":
        sub_services_text = (
            "Our Sales Products:\n"
            "• Office Supplies\n"
            "• Tech Gadgets\n"
            "• Home Appliances\n"
            "• Stationery\n\n"
            "Please let us know which product you're interested in purchasing."
        )
        reply_markup = InlineKeyboardMarkup(back_contact_keyboard)
        await query.edit_message_text(text=sub_services_text, reply_markup=reply_markup)

    elif query.data == "Innovation":
        sub_services_text = (
            "Our Innovation Idea Services:\n"
            "• Idea Generation Workshops\n"
            "• Product Prototyping\n"
            "• Research & Development\n"
            "• Innovation Consultancy\n\n"
            "Please let us know how we can assist with your innovation needs."
        )
        reply_markup = InlineKeyboardMarkup(back_contact_keyboard)
        await query.edit_message_text(text=sub_services_text, reply_markup=reply_markup)


async def main():
    app = ApplicationBuilder().token("7766854779:AAGQ4gAtuE1S7AHXR_3tSbC5ATFUxRE4o_I").build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CallbackQueryHandler(button_handler))

    try:
        logger.info("Bot is starting...")
        await app.run_polling()
    finally:
        logger.info("Bot is shutting down...")
        await app.shutdown()

if __name__ == "__main__":
    import asyncio
    import nest_asyncio

    nest_asyncio.apply()  # Allows nested event loops if required
    try:
        asyncio.run(main())
    except RuntimeError:
        loop = asyncio.get_event_loop()
        loop.create_task(main())
