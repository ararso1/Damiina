import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const CourseUpdateForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    course: '',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success, error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setMessageType('');

    try {
      const response = await axios.post('https://damiina.onrender.com/api/course-update', formData);
      setMessage(response.data.message);
      setMessageType('success');
    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
        setMessageType('error');
      } else {
        setMessage('Something went wrong, please try again later.');
        setMessageType('error');
      }
    }
  };

  return (
    <Container className="reg-from">
      <h2>Update Your Course</h2>
      {message && (
        <Alert variant={messageType === 'success' ? 'success' : 'danger'}>{message}</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select Course</Form.Label>
          <Form.Select
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            required
          >
            <option value="">Choose a course</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Video Editing">Video Editing</option>
            <option value="Amazon Affiliate Marketing">Amazon Affiliate Marketing</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary">
          Update Course
        </Button>
      </Form>
    </Container>
  );
};

export default CourseUpdateForm;
