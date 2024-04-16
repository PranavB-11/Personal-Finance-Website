import { useLayoutEffect, useState } from 'react';

import './Dashboard.css'
import Navbar from './Navbar.jsx'

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function Dashboard() {
  const [username, setUsername] = useState('')

  const authenticate = async () => {
    const cookieUsername = getCookie('username')
    const cookiePassword = getCookie('password')
  
    const response = await fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'username': cookieUsername, 'password': cookiePassword })
    })
    const responseData = await response.json()
  
    if (!responseData.success) {
      window.location.href = '/';
    } else {
      setUsername(cookieUsername)
    }
  }

  useLayoutEffect(() => {
    authenticate()
  }, []);

  return (
    <div>
      <Navbar username={username}/>
    </div>
  )
}

export default Dashboard
