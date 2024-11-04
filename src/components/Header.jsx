import React from 'react';
import { Container, Button } from 'react-bootstrap';


const Header = () => {
  return (
    <div className="header text-left text-white d-flex align-items-center justify-content-left" >
      <Container style={{}}>
          <p className="mb-2 text-uppercase" data-text="Certified Life Coach, Consaltant, Business man" style={{fontSize: '22px'}}>Certified Life Coach, Consaltant, Business man</p>
          <h1 className="display-4 fw-bold mb-3">You Have the Ability to Go Beyond!</h1>
          <p className="lead mb-4">
            Discover the tools, insights, and confidence to overcome obstacles and push beyond limitations. Together, we’ll nurture your strengths and craft a path toward your highest potential. </p>
            <button class="button-64" role="button"><span class="text">Schedule a Call</span></button>
      </Container>  
    </div>
  );
};

export default Header;
