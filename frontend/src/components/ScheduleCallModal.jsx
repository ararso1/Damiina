import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { InlineWidget } from 'react-calendly';
import axios from 'axios';

const ScheduleCallModal = ({ show, handleClose }) => {
  const [step, setStep] = useState(1); // State to track the current step
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    program: '',
    transactionId: '',
  });
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
      await axios.post('http://localhost:5000/schedule', formData);
      setMessage({ type: 'success', text: 'Information submitted successfully!' });
      setStep(3); // Proceed to Calendly after successful submission
    } catch (error) {
      console.error('Error submitting form data', error);
      setMessage({ type: 'error', text: 'There was an error submitting your information.' });
    }
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h5>Prerequisites for Scheduling</h5>
            <p>
            <strong>1. Make the Payment:</strong> To schedule a meeting with Ibsa Damiina, you are required to pay 500 birr. Save your transaction ID after making the payment.
            </p>
            <h6>Payment Methods</h6>
            <ul>
              <li>
                <strong>Commercial Bank of Ethiopia:</strong> Ebsa Mohammed Abdella - 1000160417696
              </li>
              <li>
                <strong>Awash Bank:</strong> Ebsa Mohammed Abdella - 01425907829400
              </li>
              <li>
                <strong>Abyssinia Bank:</strong> Ebsa Mohammed Abdella - 80318747
              </li>
              <li>
                <strong>COOP Bank of Oromia:</strong> Ebsa Mohammed Abdella - 1023500138638
              </li>
            </ul>
            <p><strong>2. Fill Out the Form: </strong>Enter your basic information, including the transaction ID, and submit the form.</p>
            <p><strong>3. Select Appointment: </strong>Choose your preferred date and time for the meeting from the available options.</p>
            <Button variant="primary" onClick={() => setStep(2)}>
              Proceed to Form
            </Button>
          </div>
        );
      case 2:
        return (
          <Form onSubmit={handleFormSubmit}>
            {message.text && (
              <div
                className={`text-${message.type === 'success' ? 'success' : 'danger'} mb-4`}
                style={{ fontWeight: 'bold', textAlign: 'center' }}
              >
                {message.text}
              </div>
            )}
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
                type="text"
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
              <Form.Label>Transaction ID</Form.Label>
              <Form.Control
                type="text"
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
        );
      case 3:
        return (
          <>
          <div style={{ marginTop: '20px' }}>
            <h5 className="text-center mt-4">Choose an Appointment Date and Time</h5>
            <InlineWidget url="https://cal.com/ibsa-damiina/30min" />
          </div>
         {/*  <div class="calendly-inline-widget" data-url="https://calendly.com/ianuur7/30min" style={{minWidth:"320px",height:"700px"}}></div>
          <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script> */}
        </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Schedule a Call</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderContent()}</Modal.Body>
    </Modal>
  );
};

export default ScheduleCallModal;
