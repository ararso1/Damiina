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
      console.log(formData,'kkkkkkkkkkkk')
    try {
      await axios.post('http://localhost:5000/api/register', formData);
      setSuccessMessage('Registration successful!');
      console.log('Registration successful!')
      setShowModal(true);

      // Redirect to home page after 3 seconds
      setTimeout(() => {
        setShowModal(false);
        navigate('/');
      }, 100);
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
    <Container className="reg-from" style={{color: "red"}}>
        <h3>Sorry, The System is Under Maintenance. Please Come Back Later To Register!</h3>
    </Container>
  );
};

export default CourseRegistration;
