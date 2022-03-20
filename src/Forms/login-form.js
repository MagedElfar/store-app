import React , {useState} from 'react';
import { useHistory } from 'react-router';
import db , {auth} from './../Fire Base/firebase'

function LoginForm(props){
    let user={
        email:"",
        password:"", 
    }

    const history =useHistory()


    const [msg , setmsg] = useState("")

    function setValues (e){
        user[e.target.name]= e.target.value;
    }

    async function formSubmit(e){
        e.preventDefault();
        try{
            await auth.signInWithEmailAndPassword(user.email , user.password);
            history.push("/account")
            
        } 
        catch (error) {
            setmsg(error.message)
            console.log(error.message)
        }
    }

    return(
        <>
            {( msg != "" ? <div className="alert alert-danger" role="alert">{msg}</div> : null)}
            <form onSubmit={formSubmit}>
                <div class="mb-3">
                    <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={setValues}/>
                </div>
                <div class="mb-3">
                    <label htmlFor="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" name="password" class="form-control" id="exampleInputPassword1" onChange={setValues}/>
                </div>
                <div className="row mx-0 justify-content-end">
                    <button type="submit" className={`text-center btn btn-primary col-4 col-md-2`}>
                        Login
                    </button>
                </div>
            </form>
        </>
    )
}

export default LoginForm;