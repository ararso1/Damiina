import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { InlineWidget } from 'react-calendly';
import axios from 'axios';

const ScheduleCallModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    program: '',
    programType: '',
  });
  const [showCalendly, setShowCalendly] = useState(false); // State to show Calendly
  const [message, setMessage] = useState({ type: '', text: '' }); // State for success or error message

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.program || !formData.programType) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    try {
      // Uncomment the line below and replace '/your-api-endpoint' with your API endpoint
      // await axios.post('/your-api-endpoint', formData);
      setMessage({ type: 'success', text: 'Information submitted successfully!' });
      setTimeout(() => setShowCalendly(true), 1000); // Show Calendly widget after 1 second
    } catch (error) {
      console.error('Error submitting form data', error);
      setMessage({ type: 'error', text: 'There was an error submitting your information.' });
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Schedule a Call</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display success or error message */}
          {message.text && (
            <div
              className={`text-${message.type === 'success' ? 'success' : 'danger'} mb-4`}
              style={{ fontWeight: 'bold', textAlign: 'center' }}
            >
              {message.text}
            </div>
          )}
          {!showCalendly ? (
            // Show form if Calendly is not yet visible
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
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
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Program</Form.Label>
                <Form.Control
                  as="select"
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a Program</option>
                  <option value="Life Coaching">Life Coaching</option>
                  <option value="Business Consulting">Business Consulting</option>
                  <option value="Wellness">Wellness</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Program Type</Form.Label>
                <Form.Control
                  as="select"
                  name="programType"
                  value={formData.programType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Live">Live</option>
                  <option value="In-Person">In-Person</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          ) : (
            // Show Calendly widget after form submission
            //https://calendly.com/arasoalisho2/life-coach
            <div style={{ marginTop: '20px' }}>
              <h5 className="text-center mt-4">Choose an Appointment Date</h5>
              <InlineWidget url="" />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ScheduleCallModal;
