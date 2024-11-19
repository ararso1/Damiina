import React from 'react';
import { Container, Row, Col, Badge,Image, ListGroup, Card, Button } from 'react-bootstrap';
import { FaRegClock, FaRegFileAlt, FaLightbulb} from 'react-icons/fa';

function Blogs() {
  return (
    <div>
      {/* Blog Post Preview Section */}
      <div className="text-white py-5" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/blog-bg.png')`}}>
        <Container>
          <Row className="align-items-center">
            <Col md={8} className="text-start">
              <p className="text-uppercase mb-2">By <span className="fw-bold">Ibsaa Damiina</span></p>
              <h1 className="display-4 fw-bold">Create beautiful blogs to convert more...</h1>
              <p className="lead">
                A dedicated blogger, shares insights and inspiration on personal growth, motivation, and productivity. His words resonate with readers, offering practical advice and guidance.
              </p>
              <p>2024 · 10 min read</p>
            </Col>
            <Col md={4} className="text-center">
              <img
                src={`${process.env.PUBLIC_URL}/images/blog2.jpg`} // Replace with actual image path
                alt="Blog Post"
                className="img-fluid rounded"
                style={{ border: '2px solid #ffffff', height:'35vh' }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Most Popular Category Section */}
      <Container className="my-5">
        <h2 className="text-center fw-bold mb-4" style={{ color: "#3c096c", paddingTop:'40px', paddingBottom: '40px' }}>Most Popular Category</h2>
        <Row className="text-center">
          <Col>
            <div className="d-flex flex-wrap justify-content-center gap-3 bttt">
              {["Content", "Education", "Technology", "Marketing", "Psychology", "Business", "Love", "Lifestyle", "Motivation"].map((category, index) => (
                <button
                  key={index}
                  pill
                  className="px-5 py-3 btn11" 
                >
                  {category}
                </button>
              ))}
            </div>
          </Col>
        </Row>
        <hr className="mt-5" />
      </Container>  
      <Container className="my-5">
      <Row>
        {/* Recently Published Section */}
        <Col md={8}>
          <h3 className="fw-bold mb-5">Recently Published</h3>
          {[
            {
              imgSrc: `${process.env.PUBLIC_URL}/images/blog1.jpg`,
              title: 'Markdown Language Sample Blog',
              description: 'Markdown is a lightweight markup language with plain-text-formatting syntax...',
              author: 'Ibsaa Damiina',
              date: 'May 15, 2024',
              readTime: '2 min',
              category: 'Advertising'
            },
            {
              imgSrc: `${process.env.PUBLIC_URL}/images/blog2.jpg`,
              title: 'A Marketer’s Guide to Price Comparison Websites',
              description: 'Lorem markdownum suarum successibus Auram illud...',
              author: 'Ibsaa Damiina',
              date: 'April 16, 2024',
              readTime: '1 min',
              category: 'Advertising'
            },
            {
              imgSrc: `${process.env.PUBLIC_URL}/images/blog-bg.png`,
              title: 'Markdown Language Sample Blog',
              description: 'Markdown is a lightweight markup language with plain-text-formatting syntax...',
              author: 'Ibsaa Damiina',
              date: 'May 15, 2024',
              readTime: '2 min',
              category: 'Advertising'
            },
            {
              imgSrc: `${process.env.PUBLIC_URL}/images/blog2.jpg`,
              title: 'A Marketer’s Guide to Price Comparison Websites',
              description: 'Lorem markdownum suarum successibus Auram illud...',
              author: 'Ibsaa Damiina',
              date: 'April 16, 2024',
              readTime: '1 min',
              category: 'Advertising'
            }
          ].map((post, index) => (
            <Card key={index} className="mb-5 shadow">
              <Row className="g-0">
                <Col md={4}>
                  <Image src={post.imgSrc} alt={post.title} className="img-fluid rounded-start" style={{height: '100%'}} />
                </Col>
                <Col md={8} className='' style={{paddingLeft: '10px'}}>
                  <Card.Body>
                    <Badge className="mb-3 catig" >{post.category}</Badge>
                    <Card.Title className="fw-bold mb-3">{post.title}</Card.Title>
                    <Card.Text className="text-muted">{post.description}</Card.Text>
                    <div className="d-flex align-items-center mb-2">
                      <Image
                        src={`${process.env.PUBLIC_URL}/images/damiina1.jpg`} // Replace with author's image path
                        roundedCircle
                        width={30}
                        height={30}
                        className="me-2"
                        alt={post.author}
                      />
                      <small className="text-muted">{post.author}</small>
                      <small className="text-muted mx-2">· {post.date}</small>
                      <FaRegClock className="text-muted me-1" />
                      <small className="text-muted">{post.readTime}</small>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </Col>

        {/* Sidebar: Topics and Tags */}
        <Col md={4}>
          {/* Topics Section */}
          <h4 className="fw-bold mb-5">Topics</h4>
          <ListGroup className="mb-5">
            <ListGroup.Item className="d-flex topic-list align-items-center">
              <FaRegFileAlt className="me-3" />
              Advertising
            </ListGroup.Item>
            <ListGroup.Item className="d-flex topic-list align-items-center">
              <FaRegFileAlt className="me-3" />
              Case Studies
            </ListGroup.Item>
            <ListGroup.Item className="d-flex topic-list align-items-center">
              <FaLightbulb className="me-3" />
              Mind Set
            </ListGroup.Item>
            <ListGroup.Item className="d-flex topic-list align-items-center">
              <FaLightbulb className="me-3" />
              Innovation
            </ListGroup.Item>
          </ListGroup>

          {/* Tags Section */}
          <h4 className="fw-bold mb-5">Tags</h4>
          <div className="d-flex flex-wrap gap-2 tags-list">
            {['#agency', '#business', '#technology', '#tutorial', '#innovation'].map((tag, index) => (
              <Badge
                key={index}
                pill
                bg="light"
                text="dark"
                className="p-2"
                style={{paddingBottom: '5px'}}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Blogs;
