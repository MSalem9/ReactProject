import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import MyNavbar from '../components/Navbar';

function CreatePost() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:3001/posts', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/dashboard');
    } catch (err) {
      alert('Error creating post: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <>
    <MyNavbar />
    <div style={{ height: '60px' }}></div>
    <div>
      <PostForm onSubmit={handleCreate} buttonLabel="Create Post" />
    </div>
    </>
  );
}

export default CreatePost;
