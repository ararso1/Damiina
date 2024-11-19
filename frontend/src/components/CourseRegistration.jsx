import React, { useState } from 'react';
import { Container, Form, Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const CourseRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    age: '',
    gender: '',
    education: '',
    degreeOrMasters: '',
    course: '',
    additionalInfo: '',
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error for the current field
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.fullName) formErrors.fullName = 'Full name is required';
    if (!formData.phone) formErrors.phone = 'Phone number is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = 'Valid email is required';
    if (!formData.address) formErrors.address = 'Living address is required';
    if (!formData.age || isNaN(formData.age)) formErrors.age = 'Valid age is required';
    if (!formData.gender) formErrors.gender = 'Gender is required';
    if (!formData.education) formErrors.education = 'Educational background is required';
    if (
      ['Degree', 'Master\'s'].includes(formData.education) &&
      !formData.degreeOrMasters
    )
      formErrors.degreeOrMasters = 'Please specify your degree or master\'s field';
    if (!formData.course) formErrors.course = 'Course selection is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('https://damiina.onrender.com/api/register', formData);
      setSuccessMessage('Registration successful!');
      console.log('Registration successful!')
      setShowModal(true);

      // Redirect to home page after 3 seconds
      setTimeout(() => {
        setShowModal(false);
        navigate('/');
      }, 4000);
    } catch (error) {
      if (error.response && error.response.data.message === 'You are already registered.') {
        setErrors({ email: 'This email is already registered.' });
        console.log('This email is already registered.')
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Container className="reg-from">
      <h2 className="mb-4 text-center">Course Registration</h2>
      {/* {success && <Alert variant="success">{success}</Alert>} */}
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
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email || 'This email is already registered.'}
          </Form.Control.Feedback>
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
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            isInvalid={!!errors.age}
          />
          <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
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
          <Form.Label>Educational Background</Form.Label>
          <Form.Select
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            isInvalid={!!errors.education}
          >
            <option value="">Choose</option>
            <option value="Elementary School">Elementary School or Grades 1-8</option>
            <option value="High School">High School or Grades 9-10</option>
            <option value="Preparatory School">Preparatory School or Grades 11-12</option>
            <option value="Diploma">Diploma</option>
            <option value="Degree">Degree</option>
            <option value="Master's">Master's</option>
            <option value="University Students">University Students</option>
            <option value="Completed Grade 12">Completed Grade 12, but not joined University</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.education}</Form.Control.Feedback>
        </Form.Group>

        {['Degree', 'Master\'s'].includes(formData.education) && (
          <Form.Group className="mb-3">
            <Form.Label>Specify Degree or Master's Field</Form.Label>
            <Form.Control
              type="text"
              name="degreeOrMasters"
              value={formData.degreeOrMasters}
              onChange={handleInputChange}
              isInvalid={!!errors.degreeOrMasters}
            />
            <Form.Control.Feedback type="invalid">{errors.degreeOrMasters}</Form.Control.Feedback>
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Select a Course</Form.Label>
          <Form.Select
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            isInvalid={!!errors.course}
          >
            <option value="">Choose</option>
            <option value="Website Development">Website Development</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Cryptocurrency">Cryptocurrency</option>
            <option value="Forex">Forex</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.course}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Anything You Want to Let Us Know</Form.Label>
          <Form.Control
            as="textarea"
            name="additionalInfo"
            rows={4}
            value={formData.additionalInfo}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
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
            <FaCheckCircle color="#28a745" className="" style={{fontSize: '40px'}} />
            <p className="mt-3" style={{fontSize: '23px', color: 'green'}} >{successMessage}</p>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CourseRegistration;
