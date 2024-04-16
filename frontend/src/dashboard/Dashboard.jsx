import { useLayoutEffect, useState } from 'react';

import './Dashboard.css'
import Navbar from './Navbar.jsx'
import Status from './Status.jsx'

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
  // User data
  const [username, setUsername] = useState('')
  const [sectionList, setSectionList] = useState([])

  // Authenticate user and fetch data
  const authenticate = async () => {
    const cookieUsername = getCookie('username')
    const cookiePassword = getCookie('password')
    
    // Get user data
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
      // Update username
      setUsername(cookieUsername)
      
      // Get section data
      const sections = []
      for (const key in responseData.sections) {
        sections.push(responseData.sections[key])
        sections[sections.length - 1].name = key
      }
      setSectionList(sections)
    }
  }
  useLayoutEffect(() => {
    authenticate()
  }, []);

  return (
    <div>
      <Navbar username={username}/>
      <Status SectionList={sectionList}/>
    </div>
  )
}

export default Dashboard
