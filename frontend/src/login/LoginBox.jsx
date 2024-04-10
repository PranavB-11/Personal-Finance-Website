import './LoginBox.css'

function LoginBox() {
    return (
        <div id="login-box-outer-container">
            <div id="login-box-container">
                <div id="login-box-inner-container">
                    <h1>Welcome</h1>
                    <h2>Please Login</h2>
                    <input placeholder="Username" class="login-username-box" type="text" />
                    <input placeholder="Password" class="login-password-box" type="password" />
                    <button type="button" id="login-google-button">Login with Google</button>
                    <button type="button" id="login-calnet-button">Login with CalNet</button>
                    <button type="button" id="login-signup-button">Sign Up</button>
                </div>

            </div>
        </div>
    )
}

export default LoginBox
