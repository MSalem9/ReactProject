import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../components/Navbar';
import Card from 'react-bootstrap/Card';

function UserDetails() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:3001/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);
        setUser(res.data.data.user);
      } catch (err) {
        alert('Failed to load user info.');
        navigate('/'); 
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return <div className="p-6 text-center text-lg">Loading user info...</div>;
  }

  return (
    <>
    <MyNavbar/>
    <div style={{ height: '60px' }}></div>
    <Card
      bg="light"
      text="Black"
      className="mb-4"
    >
    <Card.Header>User Details</Card.Header>
    <Card.Body>
      <Card.Text>Name: {user.name}</Card.Text>
      <Card.Text>Email: {user.email}</Card.Text>
    </Card.Body>
    </Card>
    </>
  );
}

export default UserDetails;
