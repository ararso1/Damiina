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
    transactionId: '', // Will be auto-filled if payment is via Chapa
  });
  const [message, setMessage] = useState({ type: '', text: '' }); // State for success or error message
  const [paymentInitiated, setPaymentInitiated] = useState(false); // State to track if payment is initiated
  const [paymentSuccess, setPaymentSuccess] = useState(false); // State to track if payment is successful

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to initiate Chapa payment
  const initiatePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/initiate-payment', {
        email: formData.email,
        fullName: formData.fullName,
        phone: formData.phone,
      });

      if (response.data.checkoutUrl) {
        // Redirect to Chapa payment page
        window.location.href = response.data.checkoutUrl;
        setPaymentInitiated(true);
      } else {
        setMessage({ type: 'error', text: 'Failed to initiate payment.' });
      }
    } catch (error) {
      console.error('Error initiating payment', error);
      setMessage({ type: 'error', text: 'There was an error initiating the payment.' });
    }
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.country || !formData.program) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    try {
      // Save the form data along with the transaction ID (if payment is via Chapa)
      const payload = {
        ...formData,
        paymentMethod: paymentSuccess ? 'Chapa' : 'Bank Transfer',
        transactionId: paymentSuccess ? `chapa-${Date.now()}` : formData.transactionId, // Auto-generate transaction ID for Chapa payments
      };

      await axios.post('http://localhost:5000/api/schedule', payload);
      setMessage({ type: 'success', text: 'Information submitted successfully!' });
      setStep(3); // Proceed to Calendly after successful submission
    } catch (error) {
      console.error('Error submitting form data', error);
      setMessage({ type: 'error', text: 'There was an error submitting your information.' });
    }
  };

  // Function to render content based on the current step
  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h5>Make Payment</h5>
            <p>
              To schedule a meeting with Ibsa Damiina, you are required to pay 500 birr using Chapa.
            </p>
            <Button variant="primary" onClick={initiatePayment}>
              Pay with Chapa
            </Button>
            {message.text && (
              <div
                className={`text-${message.type === 'success' ? 'success' : 'danger'} mt-3`}
                style={{ fontWeight: 'bold', textAlign: 'center' }}
              >
                {message.text}
              </div>
            )}
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
            {!paymentSuccess && (
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
            )}
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