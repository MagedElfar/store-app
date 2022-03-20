import React from 'react';
import RegisterForm from '../../Forms/register-form';
import MainBanner from '../../component/main-banner/main-baner';
import { Link } from 'react-router-dom';
import './register.css';

function Register(props){
    return(
        <div className="register-page">
            <MainBanner title={"Register"} />
            <section className="register-form aut-form">
                <div className="container">
                    <RegisterForm />
                    <div className="aut-swich">
                        Already have an account? <Link to="/login">Login here</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register;