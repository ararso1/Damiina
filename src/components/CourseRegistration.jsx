import React from 'react';
import { Container } from 'react-bootstrap';

const CourseRegistration = () => {
  return (
    <Container className="my-5 text-center">
      <h2 className="mb-4">Course Registration</h2>
      <p className="text-muted mb-4">
        Fill out the form below to secure your spot in our transformative course.
      </p>
      <div style={{ width: '100%', height: '600px', overflow: 'hidden' }}>
        <iframe
          src="https://forms.gle/f2hm46ofVbBasE9F6"
          width="100%"
          height="600"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Course Registration Form"
        >
          Loading…
        </iframe>
      </div>
    </Container>
  );
};

export default CourseRegistration;
