import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Books() {
  return (
    <Container className="my-5" style={{paddingLeft: '3%', paddingRight: '3%'}}>
      <h1 className="fw-bold text-center mb-4">Books I Love</h1>
      <hr className="my-5" />

      {/* Book Category */}
      <h2 className="mb-5">Category 1: Psychology Books </h2>
      <Row className="text-center book-list">
        {/* Book 1 */}
        <Col md={3} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img  variant="top" style={{height: '100%', width:'100%'}} src={`${process.env.PUBLIC_URL}/images/books/book1.jpg`} alt="Book Cover" /> {/* Replace with actual image path */}
            <Card.Body>
              <Card.Title>Living In Venice</Card.Title>
              <button className="button-37" role="button">📘 Get It Now</button>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Book 2 */}
        <Col md={3} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img variant="top"  src={`${process.env.PUBLIC_URL}/images/books/book2.jpg`} style={{height: '100%', width: '100%'}} alt="Book Cover" /> {/* Replace with actual image path */}
            <Card.Body>
              <Card.Title>Pursuit Of Happiness</Card.Title>
              <button class="button-37" role="button">📘 Get It Now</button>
            </Card.Body>
          </Card>
        </Col>

        {/* Book 3 */}
        <Col md={3} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/images/books/book3.jpg`} style={{height: '100%', width: '100%'}} alt="Book Cover" /> {/* Replace with actual image path */}
            <Card.Body>
              <Card.Title>Living In The Edge</Card.Title>
              <button class="button-37" role="button">📘 Get It Now</button>
            </Card.Body>
          </Card>
        </Col>

        {/* Book 4 */}
        <Col md={3} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/images/books/book4.jpg`} style={{height: '100%', width: '100%'}} alt="Book Cover" /> {/* Replace with actual image path */}
            <Card.Body>
              <Card.Title>Love Is Love</Card.Title>
              <button class="button-37" role="button">📘 Get It Now</button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <hr className="my-5" />

      <h2 className="mb-5">Category 2: Business Books </h2>
      <Row className="text-center">
        {/* Book 1 */}
        <Col md={3} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img style={{height: '100%', width: '100%'}} variant="top" src={`${process.env.PUBLIC_URL}/images/books/book1.jpg`} alt="Book Cover" /> {/* Replace with actual image path */}
            <Card.Body>
              <Card.Title>Living In Venice</Card.Title>
              <button class="button-37" role="button">📘 Get It Now</button>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Book 2 */}
        <Col md={3} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img variant="top"  src={`${process.env.PUBLIC_URL}/images/books/book2.jpg`} style={{height: '100%', width: '100%'}} alt="Book Cover" /> {/* Replace with actual image path */}
            <Card.Body>
              <Card.Title>Pursuit Of Happiness</Card.Title>
              <button class="button-37" role="button">📘 Get It Now</button>
            </Card.Body>
          </Card>
        </Col>

        {/* Book 3 */}
        <Col md={3} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/images/books/book3.jpg`} style={{height: '100%', width: '100%'}} alt="Book Cover" /> {/* Replace with actual image path */}
            <Card.Body>
              <Card.Title>Living In The Edge</Card.Title>
              <button class="button-37" role="button">📘 Get It Now</button>
            </Card.Body>
          </Card>
        </Col>

        {/* Book 4 */}
        <Col md={3} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/images/books/book4.jpg`} style={{height: '100%', width: '100%'}} alt="Book Cover" /> {/* Replace with actual image path */}
            <Card.Body>
              <Card.Title>Love Is Love</Card.Title>
              <button class="button-37" role="button">📘 Get It Now</button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2 className="mb-5">Category 3: Love and Relationship Books </h2>
      <Row className="text-center">
        {/* Book 1 */}
        <Col md={3} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img style={{height: '100%', width: '100%'}} variant="top" src={`${process.env.PUBLIC_URL}/images/books/book1.jpg`} alt="Book Cover" /> {/* Replace with actual image path */}
            <Card.Body>
              <Card.Title>Living In Venice</Card.Title>
              <button class="button-37" role="button">📘 Get It Now</button>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Book 2 */}
        <Col md={3} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img variant="top"  src={`${process.env.PUBLIC_URL}/images/books/book2.jpg`} style={{height: '100%', width: '100%'}} alt="Book Cover" /> {/* Replace with actual image path */}
            <Card.Body>
              <Card.Title>Pursuit Of Happiness</Card.Title>
              <button class="button-37" role="button">📘 Get It Now</button>
            </Card.Body>
          </Card>
        </Col>

        {/* Book 3 */}
        <Col md={3} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/images/books/book3.jpg`} style={{height: '100%', width: '100%'}} alt="Book Cover" /> {/* Replace with actual image path */}
            <Card.Body>
              <Card.Title>Living In The Edge</Card.Title>
              <button class="button-37" role="button">📘 Get It Now</button>
            </Card.Body>
          </Card>
        </Col>

        {/* Book 4 */}
        <Col md={3} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/images/books/book4.jpg`} style={{height: '100%', width: '100%'}} alt="Book Cover" /> {/* Replace with actual image path */}
            <Card.Body>
              <Card.Title>Love Is Love</Card.Title>
              <button class="button-37" role="button">📘 Get It Now</button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
}

export default Books;
