import React, { useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const InstructorRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    age: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    areaOfExpertise: '',
    yearsOfExperience: '',
    currentJobTitle: '',
    organizationName: '',
    highestDegree: '',
    fieldOfStudy: '',
    institutionsAttended: '',
    coursesToTeach: '',
    socialProfiles: '',
    shortBio: '',
    whyJoin: '',
  });
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error for the current field
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'resume') {
      setResume(files[0]);
    } //else if (name === 'certificates') {
    //   setCertificates(files);
    // }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.fullName) formErrors.fullName = 'Full name is required';
    if (!formData.gender) formErrors.gender = 'Gender is required';
    if (!formData.age) formErrors.age = 'Age is required';
    if (!formData.dateOfBirth) formErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = 'Valid email is required';
    if (!formData.phone) formErrors.phone = 'Phone number is required';
    if (!formData.address) formErrors.address = 'Address is required';
    if (!formData.areaOfExpertise) formErrors.areaOfExpertise = 'Area of Expertise is required';
    if (!formData.yearsOfExperience || isNaN(formData.yearsOfExperience))
      formErrors.yearsOfExperience = 'Valid Years of Experience is required';
    if (!formData.currentJobTitle) formErrors.currentJobTitle = 'Current Job Title is required';
    if (!formData.highestDegree) formErrors.highestDegree = 'Highest Degree is required';
    if (!formData.fieldOfStudy) formErrors.fieldOfStudy = 'Field of Study is required';
    if (!formData.coursesToTeach) formErrors.coursesToTeach = 'Courses to Teach is required';
    if (!resume) formErrors.resume = 'Resume upload is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    // Initialize FormData
    const formDataObj = new FormData();
  
    // Append form fields
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value || ''); // Ensure empty fields are handled
    });
  
    // Append files
    if (resume) formDataObj.append('resume', resume);
    // Array.from(certificates).forEach((file) => formDataObj.append('certificates', file));
  
    // Debugging: Log FormData content
    console.log('FormData content:');
    for (let pair of formDataObj.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  
    try {
      // Submit form data to the server
      //console.log(formDataObj, 'dataaaaaaaaaaa')
      await axios.post('https://damiina.onrender.com/api/instructors', formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccessMessage('Your Information Submitted Successful!');
      setShowModal(true);
  
      // Redirect to home page after 3 seconds
      setTimeout(() => {
        setShowModal(false);
        navigate('/');
      }, 4000);
    } catch (error) {
      if (error.response && error.response.data.message === 'This email is already registered.') {
        setErrors({ email: 'This email is already registered.' });
      } else {
        console.error('Submission error:', error);
      }
    }
  };
  

  return (
    <Container className="inst-form">
      <h2>Instructor Registration</h2>
      <h4>Galmee Barsiisota Qofaaf</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            isInvalid={!!errors.fullName}
          />
          <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Check
            type="radio"
            label="Male"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={handleInputChange}
          />
          <Form.Check
            type="radio"
            label="Female"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            isInvalid={!!errors.age}
          />
          <Form.Control.Feedback type="invalid">{errors.yearsOfExperience}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            isInvalid={!!errors.dateOfBirth}
          />
          <Form.Control.Feedback type="invalid">{errors.dateOfBirth}</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Living Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            isInvalid={!!errors.address}
          />
          <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Area of Expertise</Form.Label>
          <Form.Control
            type="text"
            name="areaOfExpertise"
            value={formData.areaOfExpertise}
            onChange={handleInputChange}
            isInvalid={!!errors.areaOfExpertise}
          />
          <Form.Control.Feedback type="invalid">{errors.areaOfExpertise}</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Years of Experience</Form.Label>
          <Form.Control
            type="number"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleInputChange}
            isInvalid={!!errors.yearsOfExperience}
          />
          <Form.Control.Feedback type="invalid">{errors.yearsOfExperience}</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Current Job Title</Form.Label>
          <Form.Control
            type="text"
            name="currentJobTitle"
            value={formData.currentJobTitle}
            onChange={handleInputChange}
            isInvalid={!!errors.currentJobTitle}
          />
          <Form.Control.Feedback type="invalid">{errors.currentJobTitle}</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Organization/Company Name</Form.Label>
          <Form.Control
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleInputChange}
            isInvalid={!!errors.organizationName}
          />
          <Form.Control.Feedback type="invalid">{errors.organizationName}</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Highest Degree Earned</Form.Label>
          <Form.Control
            type="text"
            name="highestDegree"
            value={formData.highestDegree}
            onChange={handleInputChange}
            isInvalid={!!errors.highestDegree}
          />
          <Form.Control.Feedback type="invalid">{errors.highestDegree}</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Field of Study</Form.Label>
          <Form.Control
            type="text"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleInputChange}
            isInvalid={!!errors.fieldOfStudy}
          />
          <Form.Control.Feedback type="invalid">{errors.fieldOfStudy}</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Institutions Attended</Form.Label>
          <Form.Control
            type="text"
            name="institutionsAttended"
            value={formData.institutionsAttended}
            onChange={handleInputChange}
            isInvalid={!!errors.institutionsAttended}
          />
          <Form.Control.Feedback type="invalid">{errors.institutionsAttended}</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Courses You Can Teach</Form.Label>
          <Form.Select
            name="coursesToTeach"
            value={formData.coursesToTeach}
            onChange={handleInputChange}
            isInvalid={!!errors.coursesToTeach}
          >
            <option value="">Choose...</option>
            <option value="Website Development">Website Development</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Cryptocurrency">Cryptocurrency</option>
            <option value="Forex">Forex</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.coursesToTeach}</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Social Media/Professional Profiles</Form.Label>
          <Form.Control
            type="url"
            name="socialProfiles"
            value={formData.socialProfiles}
            onChange={handleInputChange}
          />
        </Form.Group>
          
        <Form.Group className="mb-3">
          <Form.Label>Resume</Form.Label>
          <Form.Control type="file" name="resume" onChange={handleFileChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Short Bio or Introduction</Form.Label>
          <Form.Control
            as="textarea"
            name="shortBio"
            rows={3}
            value={formData.shortBio}
            onChange={handleInputChange}
          />
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Why They Want to Join as an Instructor (optional)</Form.Label>
          <Form.Control
            as="textarea"
            name="whyJoin"
            rows={3}
            value={formData.whyJoin}
            onChange={handleInputChange}
          />
        </Form.Group>
  
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
  
      {/* Success Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <FaCheckCircle color="#28a745" style={{ fontSize: '40px' }} />
            <p className="mt-3" style={{ fontSize: '23px', color: 'green' }}>
              {successMessage}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );  
};

export default InstructorRegistration;
