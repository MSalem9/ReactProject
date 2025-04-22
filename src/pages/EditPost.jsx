import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import MyNavbar from '../components/Navbar';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`http://localhost:3001/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost({ title: res.data.data.title, content: res.data.data.content });
      } catch (err) {
        console.error("Error fetching post:", err);
        navigate('/'); 
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.patch(
        `http://localhost:3001/posts/${id}`,
        post,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/dashboard');
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  return (
      <>
      <MyNavbar />
      <div style={{ height: '60px' }}></div>
      <div>
      <div className="main_div_Back">
    <h2 >Edit your Post</h2>
    <form onSubmit={handleSubmit} className="main_div">
      <input
          type="text"
          placeholder="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
          required
      />
      
      <textarea style={{height: "200px"}}
          placeholder="Content"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
          rows={5}
          required
      />
      <button className="button_S">
        Edit Post
      </button>
    </form>   
    </div>        
      </div>
      </>
  );
}

export default EditPost;
