import React from 'react';
import LoginForm from './../../Forms/login-form'
import MainBanner from '../../component/main-banner/main-baner';
import { Link } from 'react-router-dom';

function Login(props){
    return(
        <div className="register-page">
            <MainBanner title={"Login"} />
            <section className="register-form aut-form">
                <div className="container">
                    <LoginForm />
                    <div className="aut-swich">
                    New customer? <Link to="/register">Create your account</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;