import './Navbar.css'

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

function Navbar({username}) {
    const logout = () => {
        eraseCookie('username')
        eraseCookie('password')
        window.location.href = '/';
    }
    
    return (
        <div id="navbar">
            <h1>{username}</h1>
            <h1 id="navbar-log-out" onClick={logout}>Log Out</h1>
        </div>
    )
}

export default Navbar