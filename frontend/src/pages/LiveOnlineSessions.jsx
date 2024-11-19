import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaBullseye, FaSmile, FaHourglassHalf, FaPhone, FaCalendarCheck, FaSeedling } from 'react-icons/fa';
import './all.css'

const LiveOnlineSessions = () => {
  return (
    <div>
      {/* Banner Section */}
      <div className="text-white text-center py-5" style={{backgroundImage: `url('${process.env.PUBLIC_URL}/images/keyboard.jpg')`, height: '40vh'}}>
        <h1 className="fw-bold">Live Online Sessions</h1>
        <p className="mt-3">Join interactive sessions tailored to your personal growth journey and experience transformative change.</p>
      </div>

      {/* Session List Section */}
      <Container className="your-seat" style={{marginTop: '100px'}}>
        <h2 className="text-center fw-bold mb-5">Experience the Growth Today!</h2>

        <Row className="align-items-center py-5 border-bottom">
          <Col md={1} className="text-center">
            <FaBullseye size={25} color="#29AF8E" />
          </Col>
          <Col md={3}>
            <h5 className="fw-bold">Achieve Your Goals</h5>
          </Col>
          <Col md={5}>
            <p className="text-muted mb-0">Get focused support to overcome challenges and achieve your dreams.</p>
          </Col>
          <Col md={3} className="text-center">
            <button class="button-33" role="button">Book Your Seat</button>
          </Col>
        </Row>

        <Row className="align-items-center py-5 border-bottom">
          <Col md={1} className="text-center">
            <FaSmile size={25} color="#29AF8E" />
          </Col>
          <Col md={3}>
            <h5 className="fw-bold">Live Happy & Better Life</h5>
          </Col>
          <Col md={5}>
            <p className="text-muted mb-0">Embrace strategies for a more joyful, balanced life.</p>
          </Col>
          <Col md={3} className="text-center">
            <button class="button-33" role="button">Book Your Seat</button>
          </Col>
        </Row>

        <Row className="align-items-center py-5 border-bottom">
          <Col md={1} className="text-center">
            <FaHourglassHalf size={25} color="#29AF8E" />
          </Col>
          <Col md={3}>
            <h5 className="fw-bold">Managing Your Time</h5>
          </Col>
          <Col md={5}>
            <p className="text-muted mb-0">Master your schedule with practical time management techniques.</p>
          </Col>
          <Col md={3} className="text-center">
            <button class="button-33" role="button">Book Your Seat</button>
          </Col>
        </Row>
        <Row className="align-items-center py-5 border-bottom">
          <Col md={1} className="text-center">
            <FaHourglassHalf size={25} color="#29AF8E" />
          </Col>
          <Col md={3}>
            <h5 className="fw-bold">Keep Yourself Organized</h5>
          </Col>
          <Col md={5}>
            <p className="text-muted mb-0">Learn methods to stay organized and reduce daily stress.</p>
          </Col>
          <Col md={3} className="text-center">
            <button class="button-33" role="button">Book Your Seat</button>
          </Col>
        </Row>
        <Row className="align-items-center py-5 border-bottom">
          <Col md={1} className="text-center">
            <FaHourglassHalf size={25} color="#29AF8E" />
          </Col>
          <Col md={3}>
            <h5 className="fw-bold">Find Your Dream Job</h5>
          </Col>
          <Col md={5}>
            <p className="text-muted mb-0">Get the guidance you need to reach your career aspirations.</p>
          </Col>
          <Col md={3} className="text-center">
            <button class="button-33" role="button">Book Your Seat</button>
          </Col>
        </Row>
      </Container>

      {/* How My Process Works Section */}
      <Container className="my-5 py-5">
        <h2 className="text-center fw-bold mb-5">How My Process Work</h2>
        <Row className="text-left justify-content-center">
          <Col md={4} className="mb-4">
            <Card className="h-100 p-3 border-0 shadow-sm rounded-3 card-hover">
              <FaPhone size={25} color="#29AF8E" className="mb-3" />
              <h5 className="fw-bold">Schedule a Discovery Call</h5>
              <p className="text-muted">Start with a personalized call to discuss your goals and explore how we can work together.</p>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="h-100 p-3 border-1 shadow-lg rounded-3 card-hover">
              <FaCalendarCheck size={30} color="#29AF8E" className="mb-3" />
              <h5 className="fw-bold">Book Your Coaching Session</h5>
              <p className="text-muted">Reserve your session and take the first step toward meaningful change with structured, goal-oriented coaching.</p>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="h-100 p-3 border-0 shadow-sm rounded-3 card-hover">
              <FaSeedling size={30} color="#29AF8E" className="mb-3" />
              <h5 className="fw-bold">Experience Your Growth</h5>
              <p className="text-muted">Watch as you progress through each session, gaining insights and tools to enhance your life.</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LiveOnlineSessions;
