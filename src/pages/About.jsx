import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';

function About() {
  return (
    <div>
      {/* Banner Section */}
      <div
        className="text-white text-center py-5 about-banner"
      >
        <h1 className="fw-bold" style={{ fontFamily: 'Times' }}>About Me</h1>
        <p className="mt-3" style={{ fontSize: '17px', color: 'greenyellow'}}>
          I’m here to guide you on your journey to growth and fulfillment. With a personalized approach, I help you unlock potential and achieve lasting results.
        </p>
      </div>

      {/* About Content Section */}
      <Container className="my-5">
        {/* About Me Section */}
        <Row className="align-items-center  " style={{marginTop: "100px"}}>
            <Row className="mb-5">
              <Col md={3} className="text-uppercase text-start" style={{color: 'green'}}>About Me</Col>
              <Col md={9}>
                <h2 className="text-start" style={{fontWeight: '600', fontSize: '35px'}}>
                  I’m here to help you reach your goals and create meaningful change. Together, we’ll work to overcome challenges and unlock your full potential.
                </h2>
              </Col>
            </Row>

            <Col md={12} style={{marginTop:'20px'}}>
              <Row className="mb-4">
                <Col md={5} className='text-start'>
                  <img
                      src={`${process.env.PUBLIC_URL}/images/damiina1.jpg`} // Replace with the actual image path
                      alt="Profile"
                      className="img-fluid rounded"
                      style={{height: '80vh'}}
                    />
                </Col>
                <Col md={5}>
                  <p className="text-start" style={{fontSize: '20px'}}>
                    Ibsaa Damiina is a life coach, consultant, and business-man with many years of valuable experience. With a strong foundation in guiding others, he provides support that is both practical and transformative. Whether you’re aiming for personal growth or professional development, he’ll help you navigate your path with clarity and confidence.
                  </p>
                  <h5 className="fw-bold mt-4">I can help you with:</h5>
                  <ul className="bullet-list">
                    <p><FaCheckCircle color="#28a745" className="me-2" /> Reducing stress and finding balance</p>
                    <p><FaCheckCircle color="#28a745" className="me-2" /> Building productive habits</p>
                    <p><FaCheckCircle color="#28a745" className="me-2" /> Enhancing focus and motivation</p>
                    <p><FaCheckCircle color="#28a745" className="me-2" /> Strengthening self-confidence and self-awareness</p>
                  </ul>
                </Col>
              </Row>
              <Row>
                <blockquote className="mt-4 text-primary text-center" style={{fontSize: '25px'}}>
                  <p style={{ color:'#29AF8E'}}>“Growth comes from within; with the right support, you can achieve anything.”</p>
                  <img src={`${process.env.PUBLIC_URL}/images/signature.png`} className='text-start' alt="" style={{ }} />
                  <footer className="blockquote-footer">Ibsaa Damiina</footer>
                </blockquote>
              </Row>
            </Col>
          </Row>
      </Container>

      {/* Video Section */}
      <Container className="my-5 text-center">
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#000' }}>
          <iframe
            src="https://www.youtube.com/embed/6-o9c4nbdyE" // Replace YOUR_VIDEO_ID with the actual YouTube video ID
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          ></iframe>
        </div>
      </Container>


      {/* Certifications and Experience Section */}
      <Container className="" style={{marginTop: '100px'}}>
        <Row className="align-items-start">
          {/* Description Section */}
          <Col xs={12} md={5}>
            <h2 className="fw-bold mb-3">Certifications, Degrees, and Experience</h2>
            <p>
              With a strong foundation in coaching and specialized training, I bring extensive expertise to support you in achieving meaningful results. My credentials and experiences reflect a commitment to professional growth and a deep understanding of client needs.
            </p>
          </Col>

          {/* Certifications List Section */}
          <Col md={1}></Col>
          <Col xs={12} md={5}>
            <ul className="list-unstyled sub-title">
              <Row style={{paddingBottom: '20px'}}>
                  <Col md={1} style={{paddingTop: '10px'}}><FaCheckCircle color="#28a745" className="me-2" /></Col> 
                  <Col md={10}>
                    <strong>Professional Certified Coach, PCC</strong> <br />
                    Certified with the PCC credential, I have honed my skills in guiding clients through transformative growth and helping them reach their full potential.
                  </Col>
              </Row>
              <Row style={{paddingBottom: '20px'}}>
                  <Col md={1} style={{paddingTop: '10px'}}><FaCheckCircle color="#28a745" className="me-2" /></Col> 
                  <Col md={10}>
                    <strong>ACCG Accredited ADHD Coach</strong> <br />
                    With specialized training in ADHD coaching, I offer strategies tailored to support focus, productivity, and personal balance.
                  </Col>
              </Row>
              <Row style={{paddingBottom: '20px'}}>
                  <Col md={1} style={{paddingTop: '10px'}}><FaCheckCircle color="#28a745" className="me-2"/></Col> 
                  <Col md={10}>
                    <strong>Member of ABC, DEF</strong> <br />
                    As an active member of these professional organizations, I stay connected with industry best practices and continuously enhance my coaching skills.
                  </Col>
              </Row>
              <Row style={{paddingBottom: '20px'}}>
                  <Col md={1} style={{paddingTop: '10px'}}><FaCheckCircle color="#28a745" className="me-2" /></Col> 
                  <Col md={10}>
                    <strong>Career Specialty Services Provider (CSS)</strong> <br />
                    Through this certification, I provide targeted career guidance, supporting clients in navigating transitions and achieving their career aspirations.
                  </Col>
              </Row>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
