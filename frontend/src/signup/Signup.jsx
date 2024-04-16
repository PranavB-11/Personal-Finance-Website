import './Signup.css'

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function Signup() {
    const signup = async () => {
        const username = document.getElementById("login-username").value
        const password = document.getElementById("login-password").value

        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        })
        const responseData = await response.json()

        if (responseData.success) {
            setCookie('username', username, 10)
            setCookie('password', password, 10)
            window.location.href = '/dashboard';
        }
    }

    return (
        <div id="login-box-outer-container">
            <div id="login-box-container">
                <div id="login-box-inner-container">
                    <h1>Welcome</h1>
                    <h2>Please Signup</h2>
                    <input placeholder="Username" id="login-username" className="login-username-box" type="text" />
                    <input placeholder="Password" id="login-password" className="login-password-box" type="password" />
                    <button id="login-button" onClick={signup}>Signup</button>
                </div>
            </div>
        </div>
    )
}

export default Signup
