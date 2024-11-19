import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import ScheduleCallModal from './ScheduleCallModal';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <footer className="py-5" style={{backgroundColor: '#F0FFFF'}}>
      <Container>
        {/* Call-to-Action Banner */}
        <Row className="mt-5" style={{marginBottom: '8%'}}>
          <Col className="text-white text-center py-5 rounded" style={{textAlign: 'center', justifyItems: 'center', backgroundColor: '#29AF8E'}}>
            <h1 className="fw-bold" style={{marginTop: '20px', marginBottom: '30px'}}>Change Starts with a Single Step</h1>
            <p style={{fontSize: '17px'}}>Every journey begins with one decision. Take that step today, and start moving toward the life you envision.</p>
            <button class="button-64" role="button" onClick={() => setShowModal(true)} style={{marginTop: '30px', marginBottom: '20px'}}><span class="text">Schedule a Call</span></button>
          </Col>
        </Row>
        <ScheduleCallModal show={showModal} handleClose={() => setShowModal(false)} />
        <Row className="text-start">
          {/* Logo and Description */}
          <Col md={3} sm={6} className="mb-4">
            <Image src={`${process.env.PUBLIC_URL}/images/logo1.png`} style={{height: '7vh', marginBottom: '30px'}} ></Image>
            <p className="text-muted">
              Working with Ibsaa Damiina has been transformative! His approach is both supportive and empowering, helping you to overcome challenges and empower you to reach new heights.
            </p>
          </Col>

          {/* Services */}
          <Col md={3} sm={6} className="mb-4">
            <h5 className="fw-bold" style={{marginBottom: '30px'}}>Services</h5>
            <ul className="list-unstyled link-list">
              <li>Life coaching</li>
              <li>Career coaching</li>
              <li>Coaching packages</li>
              <li>Workshop facilitation</li>
            </ul>
          </Col>

          {/* Useful Links */}
          <Col md={3} sm={6} className="mb-4">
            <h5 className="fw-bold" style={{ marginBottom: '30px' }}>Useful Links</h5>
            <ul className="list-unstyled link-list">
              <li><a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a></li>
              <li><a href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About me</a></li>
              <li><a href="/online-sessions" style={{ textDecoration: 'none', color: 'inherit' }}>Live Online Sessions</a></li>
              <li><a href="/books" style={{ textDecoration: 'none', color: 'inherit' }}>Books</a></li>
              <li><a href="/blogs" style={{ textDecoration: 'none', color: 'inherit' }}>Blogs</a></li>
              <li><a href="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contacts</a></li>
            </ul>
          </Col>

          {/* Contact Information */}
          <Col md={3} sm={6} className="mb-4">
            <h5 className="fw-bold" style={{marginBottom: '30px'}}>Contact Info</h5>
            <p className="text-muted">
              Addis Ababa, Ethiopia<br />
              ibsadamiina@damiina.com<br />
              +251-923 456 78 90
            </p>
          </Col>
        </Row>

        {/* Social Media and Copyright */}
        <Row className="text-center mt-4">
          <Col md={4}>
            <p className="text-muted">&copy; 2024 Ibsaa Damiina</p>
          </Col>
          <Col md={4} className="d-flex media justify-content-center">
            <a href="https://www.facebook.com/profile.php/?id=61552282363545" className="text-dark me-3" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} />
            </a>
            <a href="https://instagram.com" className="text-dark me-3" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.tiktok.com/@ibsadamiina" className="text-dark me-3" target="_blank" rel="noopener noreferrer">
              <FaTiktok size={24} />
            </a>
            <a href="https://www.youtube.com/@ibsadamiinaa" className="text-dark me-3" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={24} />
            </a>
            <a href="" className="text-dark me-3" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} />
            </a>
          </Col>
          <Col md={4} className="text-end mt-2">
            <p className="text-center">Powered by Csolve Tech+</p>
          </Col>
        </Row>

      </Container>
    </footer>
  );
};

export default Footer;
