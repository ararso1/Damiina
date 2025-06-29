const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Add this line to load .env variables
const axios = require('axios'); // Use axios instead of request
const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL connection configuration using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


// Function to create the registers table if it doesn't exist
const createRegisterTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS new_registers (
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
      computer_reqts VARCHAR(50),
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
// app.use(express.urlencoded({ extended: true }));

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
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
    computerReqts,
    additionalInfo,
  } = req.body;
  try {
    // Check if the email is already registered
    console.log('leeeeeeeeel')
    const existingUser = await pool.query('SELECT * FROM new_registers WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'You are already registered.' });
    }

    // Check if the phone is already registered
    const existingUserByPhone = await pool.query('SELECT * FROM new_registers WHERE phone = $1', [phone]);
    if (existingUserByPhone.rows.length > 0) {
      
      return res.status(400).json({ message: 'Your are already registered with this phone number.' });
    }

    // Insert data into the database
    const result = await pool.query(
      'INSERT INTO new_registers (full_name, phone, email, address, age, gender, education, degree_or_masters, course, computer_reqts, additional_info) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [fullName, phone, email, address, age, gender, education, degreeOrMasters, course, computerReqts, additionalInfo]
    );

    
    // Send a confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Course Registration Confirmation',
      text: `Dear ${fullName},\n\nYou are successfully registered for the course "${course}". We will contact you soon once the course starts.\n\nThanks,\nDamiina E-learning Team!`,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Registration successful, but email sending failed.' });
      }
      res.status(200).json({ message: 'Registration successful!', data: result.rows[0] });
    });
    
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// Route to fetch all registrations
app.get('/api/registrations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM new_registers ORDER BY created_at DESC'); // Fetch all rows
    res.status(200).json(result.rows); // Send the rows as JSON
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// Route to delete a registration by ID
app.delete('/api/registrations/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM new_registers WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Registration not found.' });
    }
    res.status(200).json({ message: 'Registration deleted successfully.', data: result.rows[0] });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// Function to create the course_update table if it doesn't exist
const createCourseUpdateTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS course_update (
      id SERIAL PRIMARY KEY,
      email VARCHAR(100) NOT NULL,
      course VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Course Update table is ready.');
  } catch (error) {
    console.error('Error creating course_update table:', error);
  }
};
createCourseUpdateTable();

// Route to handle course update logic
app.post('/api/course-update', async (req, res) => {
  const { email, course } = req.body;

  try {
    // 1. Check if the user exists in the 'registers' table
    const existingUser = await pool.query('SELECT * FROM registers WHERE email = $1', [email]);

    if (existingUser.rows.length === 0) {
      return res.status(404).json({ message: 'You are not registered, please register first.' });
    }

    // Extract user info
    const user = existingUser.rows[0];

    // 2. Check if the previous course is 'Digital Marketing' and ID is 2010 or higher
    if (!user.course.includes('Digital Marketing') || user.id > 2010) {
      return res.status(400).json({ message: 'You are registered, but your previous course is not Digital Marketing or you are not in first batch.' });
    }

    // 3. Check if the user has already updated their course in the 'course_update' table
    const existingCourseUpdate = await pool.query('SELECT * FROM course_update WHERE email = $1', [email]);

    if (existingCourseUpdate.rows.length > 0) {
      return res.status(400).json({ message: 'You have already updated your course.' });
    }

    // 4. Insert the new course into the 'course_update' table
    const result = await pool.query(
      'INSERT INTO course_update (email, course) VALUES ($1, $2) RETURNING *',
      [email, course]
    );

    res.status(200).json({ message: 'Successfully updated your course, thanks!', data: result.rows[0] });

  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

//instructor
const createInstructorTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS instructors (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      gender VARCHAR(10) NOT NULL,
      age INT NOT NULL,
      date_of_birth DATE NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      phone VARCHAR(15) NOT NULL,
      address VARCHAR(255) NOT NULL,
      area_of_expertise VARCHAR(255) NOT NULL,
      years_of_experience INT NOT NULL,
      current_job_title VARCHAR(100) NOT NULL,
      organization_name VARCHAR(100) NOT NULL,
      highest_degree VARCHAR(50) NOT NULL,
      field_of_study VARCHAR(255) NOT NULL,
      institutions_attended TEXT NOT NULL,
      courses_to_teach TEXT NOT NULL,
      resume TEXT,
      social_profiles TEXT,
      short_bio TEXT,
      why_join TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Instructor table is ready.');
  } catch (error) {
    console.error('Error creating instructor table:', error);
  }
};

// Call the function to create the table
createInstructorTable();

const multer = require('multer');
const path = require('path');

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to save instructor data
app.post(
  '/api/instructors',
  upload.fields([{ name: 'resume', maxCount: 1 }]),
  async (req, res) => {

    const {
      fullName,
      gender,
      age,
      dateOfBirth,
      email,
      phone,
      address,
      areaOfExpertise,
      yearsOfExperience,
      currentJobTitle,
      organizationName,
      highestDegree,
      fieldOfStudy,
      institutionsAttended,
      coursesToTeach,
      socialProfiles,
      shortBio,
      whyJoin,
    } = req.body;

    const resumePath = req.files['resume'] ? req.files['resume'][0].path : null;

    try {
      const existingInstructor = await pool.query(
        'SELECT * FROM instructors WHERE email = $1',
        [email]
      );
      if (existingInstructor.rows.length > 0) {
        return res.status(400).json({ message: 'This email is already registered.' });
      }

      const result = await pool.query(
        `INSERT INTO instructors 
        (full_name, gender, age, date_of_birth, email, phone, address, area_of_expertise, 
        years_of_experience, current_job_title, organization_name, highest_degree, field_of_study, 
        institutions_attended, courses_to_teach, resume, social_profiles, short_bio, why_join)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) 
        RETURNING *`,
        [
          fullName,
          gender,
          parseInt(age), // Ensure age is an integer
          dateOfBirth,
          email,
          phone,
          address,
          areaOfExpertise,
          parseInt(yearsOfExperience), // Ensure years_of_experience is an integer
          currentJobTitle,
          organizationName,
          highestDegree,
          fieldOfStudy,
          institutionsAttended,
          coursesToTeach,
          resumePath,
          socialProfiles,
          shortBio,
          whyJoin,
        ]
      );

      // Send a confirmation email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Data Recieved Confirmation',
        text: `Dear ${fullName},\n\nYou are successfully registered for our course "${coursesToTeach}" as an instructor. We will contact you soon.\n\nThanks,\nDamiina E-learning Team!`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: 'Registration successful, but email sending failed.' });
        }
        res.status(200).json({ message: 'Instructor registration successful!', data: result.rows[0] });
      });

    } catch (error) {
      console.error('Error saving instructor:', error);
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }
);

//fetch instructors
app.get('/api/fetch_instructors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM instructors ORDER BY created_at DESC'); // Fetch all rows
    res.status(200).json(result.rows); // Send the rows as JSON
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// Route to delete instructors by ID
app.delete('/api/instructors_del/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM instructors WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Registration not found.' });
    }
    res.status(200).json({ message: 'Registration deleted successfully.', data: result.rows[0] });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// Function to create the "schedule" table if it doesn't exist
const createScheduleTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schedule (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      phone VARCHAR(15) NOT NULL,
      country VARCHAR(100) NOT NULL,
      program VARCHAR(100) NOT NULL,
      transaction_id VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Schedule table is ready.');
  } catch (error) {
    console.error('Error creating schedule table:', error);
  }
};
// Call the function to create the table
createScheduleTable();

// Endpoint to initiate Chapa payment
app.post('/api/initiate-payment', async (req, res) => {
  const { email, fullName, phone } = req.body;

  console.log('Received request to initiate payment:', { email, fullName, phone });

  try {
    const response = await axios.post(
      'https://api.chapa.co/v1/transaction/initialize',
      {
        amount: '500', // Amount in birr
        currency: 'ETB',
        email: email,
        first_name: fullName.split(' ')[0],
        last_name: fullName.split(' ')[1] || '',
        phone_number: phone,
        tx_ref: `tx-${Date.now()}`, // Unique transaction reference
        callback_url: 'http://localhost:3000/', // Callback URL after payment
        return_url: 'http://localhost:3000/', // Return URL after payment
        customization: {
          title: 'Meeting payment',
          description: 'Scheduling a call with Ibsa Damiina',
        },
      },
      {
        headers: {
          Authorization: `Bearer CHASECK-P8r5jneU6DzlFOwh5alhGl9RHo673Wbb`, // Your Chapa secret key
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Chapa API response:', response.data);

    if (response.data.status === 'success') {
      res.json({ checkoutUrl: response.data.data.checkout_url });
    } else {
      console.error('Chapa API returned an error:', response.data);
      res.status(400).json({ error: 'Failed to initiate payment.' });
    }
  } catch (error) {
    console.error('Error initiating payment:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to initiate payment.' });
  }
});

// Endpoint to handle scheduling submissions
app.post('/api/schedule', async (req, res) => {
  const { fullName, email, phone, country, program, transactionId, paymentMethod } = req.body;

  console.log('Received request to save schedule:', { fullName, email, phone, country, program, transactionId, paymentMethod });

  try {
    // Insert new schedule entry
    const result = await pool.query(
      `INSERT INTO schedule (full_name, email, phone, country, program, transaction_id, payment_method)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [fullName, email, phone, country, program, transactionId, paymentMethod]
    );

    res.status(200).json({ message: 'Schedule entry saved successfully!', data: result.rows[0] });
  } catch (error) {
    console.error('Error saving schedule entry:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

//fetch schedule
app.get('/api/fetch_schedule', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM schedule ORDER BY created_at DESC'); // Fetch all rows
    res.status(200).json(result.rows); // Send the rows as JSON
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
