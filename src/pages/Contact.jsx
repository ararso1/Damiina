import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaLinkedin, FaTwitter, FaFacebook, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import './all.css'

function Contact() {
  return (
    <>
    <div className="bg-success text-white py-5">
      <Container>
        <Row className="mb-5">
          <Col md={6} className="mb-4">
            <h1 className="fw-bold">Contact Me</h1>
            <p className="lead">
              Feel free to contact me for any questions and doubts
            </p>
            <p>
              Vulputate egestas nullam volutpat diam nisi at venenatis adipiscing massa posuere massa nulla massa id integer.
            </p>
            <p>
              Cras ullamcorper fermentum arcu in sed fermentum velit nulla scelerisque pharetra tristique lectus justo faucibus purus est purus gravida nibh odio ante.
            </p>
            <h5 className="mt-4">Stay in Touch</h5>
            <div className="d-flex align-items-center">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaLinkedin size={30} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaTwitter size={30} />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaFacebook size={30} />
              </a>
            </div>
          </Col>

          {/* Contact Form Section */}
          <Col md={6}>
            <h4>I would love to hear from you</h4>
            <p>Vitae nibh lacinia egestas scelerisque in purus cursus sed.</p>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formFirstName" className="mb-3">
                    <Form.Label className="text-white">First name</Form.Label>
                    <Form.Control type="text" placeholder="First name" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formLastName" className="mb-3">
                    <Form.Label className="text-white">Last name</Form.Label>
                    <Form.Control type="text" placeholder="Last name" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control type="email" placeholder="Email address" />
              </Form.Group>
              <Form.Group controlId="formSubject" className="mb-3">
                <Form.Label className="text-white">Subject</Form.Label>
                <Form.Control type="text" placeholder="Subject" />
              </Form.Group>
              <Form.Group controlId="formMessage" className="mb-3">
                <Form.Label className="text-white">Your message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Your message" />
              </Form.Group>
              <Button variant="outline-light" type="submit" className="w-50">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>

    <Container className='py-5'>
        {/* Contact Details and Map Section */}
        <Row className="text-left my-5">
          <Col md={4} className="mb-3">
                <Row>
                    <Col md={2}>
                        <FaMapMarkerAlt size={26} color="green" />
                        </Col>
                        <Col md={10}>
                            <h5 className="text-uppercase mt-2">Find Me</h5>
                            <p>123 Fifth Avenue, New York, NY 12004. United States.</p>
                    </Col>
                </Row>
          </Col>
          <Col md={4} className="mb-3">
                <Row>
                    <Col md={2}>
                        <FaEnvelope size={26} color="green" />
                    </Col>
                    <Col md={10}>
                        <h5 className="text-uppercase mt-2">Email Me</h5>
                        <p>mail@example.com</p>
                    </Col>
                </Row>
          </Col>
          <Col md={4} className="mb-3">
                <Row>
                    <Col md={2}>
                        <FaPhone size={25} color="green" />
                    </Col>
                    <Col md={10}>
                        <h5 className="text-uppercase mt-2">Call Me</h5>
                        <p>+01 - 123 456 78 90</p>
                    </Col>
                </Row>
          </Col>
        </Row>

        {/* Google Map Embed */}
        <Row>
          <Col>
            <div className="map-responsive">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.998061793446!2d-73.99208208459567!3d40.73880517932848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af18de3b1b%3A0x4ddc85a6c6d70f87!2s123%205th%20Ave%2C%20New%20York%2C%20NY%2010003%2C%20USA!5e0!3m2!1sen!2sus!4v1614757472296!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </Col>
        </Row>

    </Container>
    </>
  );
}

export default Contact;