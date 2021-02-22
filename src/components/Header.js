import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container } from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>React ToDo Webapp</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default Header;