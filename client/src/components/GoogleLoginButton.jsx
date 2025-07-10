import React from 'react';

const GoogleLoginButton = () => {
  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);

    const handleLogin = () => {
      const params = new URLSearchParams({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirect_uri: 'http://localhost:3000/auth/callback',
        response_type: 'code',
        scope: 'openid email profile',
        access_type: 'offline',
        prompt: 'consent',
      });
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    };
  
    return <button onClick={handleLogin}>Sign in with Google</button>;
  };
  
  export default GoogleLoginButton;