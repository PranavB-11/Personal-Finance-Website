import './LoginBox.css'

function LoginBox() {
    return (
        <div id="login-box-outer-container">
            <div id="login-box-container">
                <form action="http://localhost:3000/login" method="post" id="login-box-inner-container">
                    <h1>Welcome</h1>
                    <h2>Please Login</h2>
                    <input placeholder="Username" class="login-username-box" type="text" />
                    <input placeholder="Password" class="login-password-box" type="password" />
                    <input type="submit" value="Login" id="login-button"/>
                    <button id="signup-button">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default LoginBox
