import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div >
      <div className="main_div_Back">
        <h1 className="text-4xl font-bold mb-6">Welcome to Post Manager</h1>
        <div className="main_div">
          <button
            className="button_S"
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
          <button
            className="button_S mt-2"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
