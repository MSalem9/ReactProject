import { useState, useEffect } from 'react';

function PostForm({ onSubmit, initialData = {}, buttonLabel }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    if (initialData.title || initialData.content) {
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="main_div_Back">
    <h2 >Create New Post</h2>
    <form onSubmit={handleSubmit} className="main_div">
      <input
        type="Text"
        name="title"
        placeholder="Post Title"
        className="input_type1"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea style={{height: "200px"}}
        type="Text"
        name="content"
        placeholder="Post Content"
        className="input_type1"
        row={6}
        value={formData.content}
        onChange={handleChange}
        required
      />
      <button className="button_S">
        Post
      </button>
    </form>
  </div>
    
  );
}

export default PostForm;
