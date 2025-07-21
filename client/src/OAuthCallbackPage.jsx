import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetch('http://localhost:3000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => {
          console.log('Logged in as', data.user);
          navigate('/output');
        });
    }
  }, []);

  return <p>Logging you in...</p>;
};

export default OAuthCallbackPage;
