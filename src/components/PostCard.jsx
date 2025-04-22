import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function PostCard({ post, isUserPost, onEdit, onDelete }) {
    return (
    <>
    <Card
      bg="light"
      text="black"
      // style={{ width: '18rem' }}
      className="mb-4"
    >
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span>{post.title}</span>
        <Button
          variant={post.isFavorite ? "warning" : "outline-warning"}
          onClick={() => onToggleFavorite(post._id)}
        >
          ⭐
        </Button>
      </Card.Header>
      <Card.Body>
        <Card.Text>{post.content}</Card.Text>
      </Card.Body>

      {isUserPost && (
        <Card.Body className="d-flex justify-content-end gap-2 pt-0">
          <Button variant="success" onClick={() => onEdit(post._id)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => onDelete(post._id)}>
            Delete
          </Button>
        </Card.Body>
      )}
    </Card>
  </>
      
    
    
    );
  }
  
  export default PostCard;
  
  