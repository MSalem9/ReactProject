import { useEffect, useState } from 'react';
import axios from 'axios';
import MyNavbar from '../components/Navbar';
import PostCard from '../components/Postcard';
import { Navigate ,useNavigate } from 'react-router';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Dashboard() {
  const [userPosts, setUserPosts] = useState([]);
  const [publicPosts, setPublicPosts] = useState([]);

  const fetchPosts = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      const [userPosts] = await Promise.all([
        axios.get('http://localhost:3001/posts', config),
      ]);

      setUserPosts(userPosts.data.data.userPosts); 
      const [publicPosts] = await Promise.all([
        axios.get('http://localhost:3001/posts', config),
      ]);

      setPublicPosts(publicPosts.data.data.publicPosts);
    }
     catch (err) {
      console.error('Failed to fetch posts', err);
      // alert('You must sign in.');
      navigate('/'); 
    }
  };
  

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      await axios.delete(`http://localhost:3001/posts/${id}`, config);
      setUserPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Failed to delete post', err);
    }
  };

  const navigate = useNavigate();

  const handleEdit = async (id) => {
    try {
    navigate(`/edit/${id}`);
    }
    catch (err) {
      console.error('Failed to edit post', err);
    }
  };

  const handleCreatePost = () => {
    Navigate('/Dashboard/CreatePost');
    console.log('Create New Post');
  };

  const [favoritePostIds, setFavoritePostIds] = useState([]);
    const handleToggleFavorite = (postId) => {
    setFavoritePostIds((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );

};


  useEffect(() => {
    fetchPosts();
  }, []);


return (
  <>
  <MyNavbar onCreatePost={handleCreatePost} />
  <div style={{ height: '60px' }}></div>
  <div class="w-100">
  <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="My Posts">
      {/* User Posts Section */}
        <div class="w-100">
          <Container>
            <Row>
              <Col>
                  <h2 className="text-2xl font-bold mb-4">Your Posts</h2>
                  {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={{ ...post, isFavorite: favoritePostIds.includes(post._id) }}
                    isUserPost={true}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))
              ) : (
                <p className="text-gray-500">No posts available. Create one!</p>
              )}
              </Col>
            </Row>
          </Container>
        </div>
      </Tab>
      <Tab eventKey="profile" title="Public Posts">
      {/* Public Posts Section */}
      <div class="w-100">
          <Container>
            <Row>
              <Col>
                    <h2 className="text-2xl font-bold mb-4">Public Posts</h2>
                {publicPosts.length > 0 ? (
                  publicPosts.map((post) => (
                    <PostCard key={post._id} post={post} isUserPost={false} />
                  ))
                ) : (
                  <p className="text-gray-500">No public posts available.</p>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </Tab>
      <Tab eventKey="contact" title="Favorite Posts">
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">⭐ Favorite Posts</h2>
        {userPosts
          .filter((post) => favoritePostIds.includes(post._id))
          .map((post) => (
            <PostCard
              key={post._id}
              post={{ ...post, isFavorite: true }}
              isUserPost={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
      </div>
      </Tab>
    </Tabs>
  </div>
</>
);
}

export default Dashboard;
