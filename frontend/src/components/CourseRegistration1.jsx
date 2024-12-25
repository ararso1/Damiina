import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { InlineWidget } from 'react-calendly';
import axios from 'axios';

const ScheduleCallModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    program: '',
    transactionId: '',
  });
  const [showCalendly, setShowCalendly] = useState(false); // State to show Calendly
  const [message, setMessage] = useState({ type: '', text: '' }); // State for success or error message

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.country || !formData.program || !formData.transactionId) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    try {
      console.log(formData,'kkkkkkkkkk')
      // Uncomment the line below and replace '/your-api-endpoint' with your API endpoint
      await axios.post('http://localhost:5000/schedule', formData);
      setMessage({ type: 'success', text: 'Information submitted successfully!' });
      setTimeout(() => setShowCalendly(true), 6000); // Show Calendly widget after 1 second
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
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="tel"
                  name="country"
                  value={formData.country}
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
                <option value="relationship">Relationship</option>
                <option value="business">Business</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="personal_growth">Personal Growth</option>
                <option value="finance">Finance</option>
                <option value="technology">Technology</option>
                <option value="time_management">Time Management</option>
                <option value="leadership">Leadership</option>
                <option value="communication">Communication</option>
                <option value="family">Family</option>
                <option value="career">Career</option>
                <option value="spirituality">Spirituality</option>
                <option value="hobbies">Hobbies & Interests</option>
                <option value="community">Community</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Trasaction ID:</Form.Label>
                <Form.Control
                  type="tel"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          ) : (
            // Show Calendly widget after form submission
            //https://calendly.com/arasoalisho2/life-coach
            <div style={{ marginTop: '20px' }}>
              <h5 className="text-center mt-4">Choose an Appointment Date and Time</h5>
              <InlineWidget url="https://calendly.com/arasoalisho2/life-coach" />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ScheduleCallModal;
