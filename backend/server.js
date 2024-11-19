const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'courseregistration_user', // Update with your PostgreSQL username
  host: 'postgresql://courseregistration_user:kHMzDbKfXWzlSiNawkSTAQifhwhWybK7@dpg-csu5aut6l47c73dkfnqg-a/courseregistration', // Update if your PostgreSQL is hosted elsewhere
  database: 'courseregistration', // Name of the database
  password: 'kHMzDbKfXWzlSiNawkSTAQifhwhWybK7', // Update with your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

// Function to create the registers table if it doesn't exist
const createRegisterTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS registers (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      phone VARCHAR(15) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      address VARCHAR(255) NOT NULL,
      age INT NOT NULL,
      gender VARCHAR(10) NOT NULL,
      education VARCHAR(50) NOT NULL,
      degree_or_masters VARCHAR(255),
      course VARCHAR(50) NOT NULL,
      additional_info TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Register table is ready.');
  } catch (error) {
    console.error('Error creating register table:', error);
  }
};

// Call the function to create the table when the server starts
createRegisterTable();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arasoalisho2@gmail.com', // Replace with your email
    pass: 'duir rboo alel uhjk', // Replace with your email password or app password
  },
});

// Route to save data to PostgreSQL
app.post('/api/register', async (req, res) => {
  const {
    fullName,
    phone,
    email,
    address,
    age,
    gender,
    education,
    degreeOrMasters,
    course,
    additionalInfo,
  } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await pool.query('SELECT * FROM registers WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'You are already registered.' });
    }
    
    // Insert data into the database
    const result = await pool.query(
      'INSERT INTO registers (full_name, phone, email, address, age, gender, education, degree_or_masters, course, additional_info) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [fullName, phone, email, address, age, gender, education, degreeOrMasters, course, additionalInfo]
    );

    // Send a confirmation email
    const mailOptions = {
      from: 'arasoalisho2@gmail.com', // Replace with your email
      to: email,
      subject: 'Course Registration Confirmation',
      text: `Dear ${fullName},\n\nYou are successfully registered for the course "${course}". We will contact you soon once the course starts.\n\nThanks,\nDamiina Course Team!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Registration successful, but email sending failed.' });
      }
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Registration successful!', data: result.rows[0] });
    });
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
