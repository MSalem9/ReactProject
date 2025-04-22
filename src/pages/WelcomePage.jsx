import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div >
      <div className="main_div_Back">
        <img src="./src/assets/LOGO.jpeg" alt="Description of image" width="400"/>
        <div style={{ height: '60px' }}></div>
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
