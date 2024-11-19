
import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaTasks, FaHourglassHalf, FaBullseye, FaCalculator } from 'react-icons/fa';
import CourseRegistration from '../components/CourseRegistration';

const Home = () => {
  return (
    <>
      <Container className="text-center" style={{marginTop: '90px', }}>
                
        {/* Registration Section */}
        <Row className="mt-5 mb-5">
          <Col md={8} className="mx-auto text-center">
            <h3 className="mb-3">Register for Our Course</h3>
            <p className="text" style={{ fontSize: '17px', color: 'brown' }}>
              Join our comprehensive course designed to help you achieve your goals with expert guidance and practical strategies.
            </p>
            <Button
              variant="success"
              size="lg"
              onClick={() => window.location.href = '/course-registration'}
            >
              Register Now
            </Button>
          </Col>
        </Row>
        {/* Section Title */}
        <h2 className="mb-4">What Are You Struggling With?</h2>
        <p className="text-muted mb-5" style={{marginLeft: '10%', marginRight:'10%', fontSize: '17px'}}>
          Identify your challenges—whether it's staying organized, managing time, setting life goals, or maintaining accountability—and discover practical solutions to help you thrive.
        </p>

        {/* Icon Row */}
        <Row className=''>
          <Col md={3} sm={6} xs={12} className="mb-5" >
            <FaTasks size={35} color="#3CB371" className='mb-4' />
            <h5 className="mt-3">Staying Organized</h5>
            <p className="text-muted" style={{fontSize: '17px'}}>Find effective ways to streamline your tasks and declutter your life, making organization a habit that supports your success.</p>
          </Col>
          
          <Col md={3} sm={6} xs={12} className="mb-4 challenges">
            <FaHourglassHalf size={35} color="#3CB371" className='mb-4' />
            <h5 className="mt-3">Time Management</h5>
            <p className="text-muted" style={{fontSize: '17px'}}>Master your schedule to make the most of each day, balancing responsibilities with efficiency and ease.</p>
          </Col>

          <Col md={3} sm={6} xs={12} className="mb-4 challenges">
            <FaBullseye size={35} color="#3CB371" className='mb-4' />
            <h5 className="mt-3">Life Goals</h5>
            <p className="text-muted" style={{fontSize: '17px'}}>Set and pursue meaningful goals that align with your values and lead to personal fulfillment.</p>
          </Col>

          <Col md={3} sm={6} xs={12} className="mb-4 challenges">
            <FaCalculator size={35} color="#3CB371" className='mb-4' />
            <h5 className="mt-3">Accountability</h5>
            <p className="text-muted" style={{fontSize: '17px'}}>Stay on track with your commitments by building a strong support system and self-discipline.</p>
          </Col>
        </Row>

        {/* Two-Column Additional Section Below Icons */}
        <Row className="mt-5 align-items-left">
          <Col md={5} className="text-left" style={{textAlign:'left'}}>
            <h2 className="" style={{fontWeight: '600'}}>Gain Control of Your Life and Find the Balance You Need to Succeed!</h2>
          </Col>
          <Col md={5} className="text-md-start text-left">
            <p className="text-muted" style={{marginLeft: "40px", fontSize: '17px'}}>
              Take charge of your journey with strategies that bring clarity, balance, and purpose. Embrace tools and techniques to reduce stress, build resilience, and create a life that aligns with your goals and values.
            </p>
          </Col>
        </Row>

        {/* New Section with Image and Panels */}
        <div className="my-5">
          {/* Top Image */}
          <img
            src={`${process.env.PUBLIC_URL}/images/relax.jpg`} // Replace with the actual image path
            alt="Empowering Life Image"
            className="img-fluid rounded-top"
            style={{ width: '100%', marginBottom: '-4px' }} // Adjust margin to remove gap
          />

          {/* Panel Row */}
          <Row className="gx-0"> {/* Set gx-0 to remove gutter between columns */}
            <Col md={3} sm={6} xs={12}>
              <Card className="text-start card1 text-white h-100" style={{ backgroundColor: '#29AF8E', borderRadius: '0', paddingLeft: '15px', paddingTop: '20px', paddingBottom: '20px'}}>
                <Card.Body>
                  <Card.Text className="fw-bold mb-2">01.</Card.Text>
                  <Card.Title style={{fontSize: '23px'}}>Reduce Anxiety & Stress</Card.Title>
                  <Card.Text>Learn practical techniques to manage stress and ease anxiety, helping you feel more at peace in your daily life.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} sm={6} xs={12}>
              <Card className="text-start text-white h-100" style={{ backgroundColor: '#29AF8E', borderRadius: '0', paddingLeft: '15px', paddingTop: '20px', paddingBottom: '20px' }}>
                <Card.Body>
                  <Card.Text className="fw-bold mb-2">02.</Card.Text>
                  <Card.Title style={{fontSize: '23px'}}>Support Career Change</Card.Title>
                  <Card.Text>Get the guidance and tools you need to navigate career transitions with confidence and clarity.</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} xs={12}>
              <Card className="text-start text-white h-100" style={{ backgroundColor: '#29AF8E', borderRadius: '0', paddingLeft: '15px', paddingTop: '20px', paddingBottom: '20px' }}>
                <Card.Body>
                  <Card.Text className="fw-bold mb-2">03.</Card.Text>
                  <Card.Title style={{ fontSize: '23px'}}>Gain Confidence</Card.Title>
                  <Card.Text>Build self-assurance and unlock your potential with strategies to strengthen your inner belief.</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} xs={12}>
              <Card className="text-start text-white h-100" style={{ backgroundColor: '#29AF8E', borderRadius: '0', paddingLeft: '15px', paddingTop: '20px', paddingBottom: '20px' }}>
                <Card.Body>
                  <Card.Text className="fw-bold mb-2">—</Card.Text>
                  <Card.Title style={{fontSize: '25px', }}>Find Your New Narrative</Card.Title>
                  <Card.Text className="">
                    <button class="button-64" role="button"><span class="text">Schedule a Call</span></button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

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
                      src={`${process.env.PUBLIC_URL}/images/damiina.jpg`} // Replace with the actual image path
                      alt="Profile"
                      className="img-fluid rounded"
                    />
                </Col>
                <Col md={5}>
                  <p className="text-start" style={{fontSize: '20px'}}>
                    Ibsaa Damiina is a life coach, consultant, and business-man with many years of valuable experience. With a strong foundation in guiding others, he provides support that is both practical and transformative. Whether you’re aiming for personal growth or professional development, he’ll help you navigate your path with clarity and confidence.
                  </p>
                  <a href="#read-more" className="text-decoration-none text-green fw-bold" style={{fontSize: '18px'}}>
                    Read More <span>→</span>
                  </a>

                  <blockquote className="mt-4 text-primary text-start" style={{fontSize: '25px'}}>
                    <p style={{ color:'#29AF8E'}}>“Growth comes from within; with the right support, you can achieve anything.”</p>
                    <img src={`${process.env.PUBLIC_URL}/images/signature.png`} className='text-start' alt="" style={{ }} />
                    <footer className="blockquote-footer">Ibsaa Damiina</footer>
                  </blockquote>
                  </Col>
              </Row>
            </Col>
          </Row>

        {/* Subscription Section */}
        <Row className="text-white text-center py-5 rounded" style={{backgroundColor: '#29AF8E', paddingTop: '100px', marginTop: '70px'}}>
          <Col className="" md={5}>
            <h1 className='text-start' style={{ paddingLeft: '20px'}}>Get My Free Essential Mindset Exercises</h1>
          </Col>
          <Col className=''>
          <Form className="d-flex justify-content-center mt-3">
              <Form.Control
                type="email"
                placeholder="Email address"
                className="w-50 me-2"
              />
              <button class="button-64" role="button"><span class="text">Subscribe</span></button>
            </Form>
          </Col>
        </Row>

        {/* Testimonials Section */}
        <Row className="my-5 text-center">
          <Col xs={12}>
            <p className="text-uppercase" style={{color: '#29AF8E'}}>Testimonials</p>
            <h2 className="fw-bold">What My Clients are Saying</h2>
          </Col>
        </Row>

        <Row className="text-start gy-4">
          <Col md={6}>
            <Card className="h-100 border-0">
              <Card.Body>
                <Card.Text className="text-success fs-1">“</Card.Text>
                <Card.Text style={{fontWeight: 'bold', marginTop: '-35px', fontSize: '18px'}}>
                  Working with you has been transformative. I feel more confident and balanced in all areas of my life.
                </Card.Text>
                <Card.Footer className="border-0 bg-transparent d-flex align-items-center mt-4">
                  <img src={`${process.env.PUBLIC_URL}/images/ararso.jpg`} alt="Client 1" className="rounded-circle me-3" style={{ width: '40px', height: '40px' }} />
                  <small className="text-muted">Ararso Alisho</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="h-100 border-0">
              <Card.Body>
                <Card.Text className="text-success fs-1">“</Card.Text>
                <Card.Text style={{fontWeight: 'bold', marginTop: '-35px', fontSize: '18px'}}>
                  Your guidance helped me stay focused and motivated during a critical career transition. I’m grateful for your support!
                </Card.Text>
                <Card.Footer className="border-0 bg-transparent d-flex align-items-center mt-4">
                  <img src={`${process.env.PUBLIC_URL}/images/biftu.jpg`} alt="Client 2" className="rounded-circle me-3" style={{ width: '40px', height: '40px' }} />
                  <small className="text-muted">Biiftu Merga</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="h-100 border-0">
              <Card.Body>
                <Card.Text className="text-success fs-1">“</Card.Text>
                <Card.Text style={{fontWeight: 'bold', marginTop: '-35px', fontSize: '18px'}}>
                  With your coaching, I’ve developed a deeper sense of purpose and resilience. Thank you for helping me reach new heights.
                </Card.Text>
                <Card.Footer className="border-0 bg-transparent d-flex align-items-center mt-4">
                  <img src={`${process.env.PUBLIC_URL}/images/robert.jpeg`} alt="Client 3" className="rounded-circle me-3" style={{ width: '40px', height: '40px' }} />
                  <small className="text-muted">Roberto Lopez</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="h-100 border-0">
              <Card.Body>
                <Card.Text className="text-success fs-1">“</Card.Text>
                <Card.Text style={{fontWeight: 'bold', marginTop: '-35px', fontSize: '18px'}}>
                  Your insights and techniques have truly empowered me. I feel more in control and capable than ever before.
                </Card.Text>
                <Card.Footer className="border-0 bg-transparent d-flex align-items-center mt-4">
                  <img src={`${process.env.PUBLIC_URL}/images/kebede.jpg`} alt="Client 4" className="rounded-circle me-3" style={{ width: '40px', height: '40px' }} />
                  <small className="text-muted">Kebede Tesfa</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
