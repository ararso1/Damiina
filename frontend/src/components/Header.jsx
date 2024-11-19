import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import ScheduleCallModal from './ScheduleCallModal';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="header text-left text-white d-flex align-items-center justify-content-left">
        <Container>
          <p className="mb-2 text-uppercase" style={{ fontSize: '22px' }}>Certified Life Coach, Consultant, Businessman</p>
          <h1 className="display-4 fw-bold mb-3">You Have the Ability to Go Beyond!</h1>
          <p className="lead mb-4">
            Discover the tools, insights, and confidence to overcome obstacles and push beyond limitations. Together, we’ll nurture your strengths and craft a path toward your highest potential.
          </p>
            <button className="button-64" role="button" onClick={() => setShowModal(true)}>
              <span className="text">Schedule a Call</span>
            </button>
        </Container>
      </div>

      <ScheduleCallModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default Header;
