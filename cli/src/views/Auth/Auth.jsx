import React from "react";

function Auth() {
    return (
        <div className="auth-content">
            <div className="container">
                <div class="intro-content">
    				<h1 class="name-appear"><i class="fas fa-book"></i> Kafka</h1>
    				<p class="slogan-appear">Book for everyone</p>
    				<p class="beMember-appear">Don't have account? Want to be a member?</p>
    				<button class="beMember-appear">Join Us</button>
    				<p class="social-appear">Or login via social account</p>
    				<div>
    					<button class="facebook-appear"><i class="fab fa-facebook-f"></i> <span>Facebook</span></button>
    					<button class="twitter-appear"><i class="fab fa-twitter"></i> <span>Twitter</span></button>
    					<button class="google-appear"><i class="fab fa-google"></i> <span>Google</span></button>
    				</div>
    			</div>
            </div>
        </div>
    )
}

export default Auth;
