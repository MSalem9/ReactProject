import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Button from 'react-bootstrap/Button';



function MyNavbar({ onCreatePost }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  

  return (

<Navbar bg="dark" data-bs-theme="dark" expand="lg" fixed="top" className="w-100">
  <Container fluid>
    <Navbar.Brand >POSTATY</Navbar.Brand>
    
    {/* Left side links */}
    <Nav className="me-auto">
      <Nav.Link onClick={() => navigate('/dashboard')}>Home</Nav.Link>
      <Nav.Link onClick={() => navigate('/Dashboard/CreatePost')}>Create New Post</Nav.Link>
      <Nav.Link onClick={() => navigate('/Dashboard/UserDetails')}>Profile</Nav.Link>
    </Nav>

    {/* Right side - Sign Out */}
    <Nav className="ms-auto">
      <Button onClick={handleSignOut} variant="outline-danger">Sign Out</Button>
    </Nav>
  </Container>
</Navbar>

  );
}

export default MyNavbar;
