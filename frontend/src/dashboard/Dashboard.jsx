import React from 'react'
import ReactDOM from 'react-dom/client'

import './Dashboard.css'

import Navbar from './Navbar.jsx'
import Status from './Status.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    <Status/>
  </React.StrictMode>,
)
