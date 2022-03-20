import React , {useState} from 'react';
import { useHistory } from 'react-router';
import db , {auth} from './../Fire Base/firebase'

function RegisterForm(props){
    let user={
        userName:"",
        email:"",
        password:"", 
        id: "",
        image:"https://firebasestorage.googleapis.com/v0/b/react-store-8d220.appspot.com/o/user%2Fthesomeday123170900021.jpg?alt=media&token=6918446f-be87-4774-af91-7fdc2166e419"
    }

    const history =useHistory()


    const [msg , setmsg] = useState("")

    function setValues (e){
        user[e.target.name]= e.target.value;
    }

    async function formSubmit(e){
        e.preventDefault();
        try{
            await auth.createUserWithEmailAndPassword(user.email , user.password).then((userCredential) => {
               let userId = userCredential.user.uid;
               user = {...user , id:userId}
            });
            await db.collection("user").doc(user.id).set(user).then(() => {
                console.log("added")
            });
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
                    <label htmlFor="exampleInputEmail1" class="form-label">User Name</label>
                    <input type="text" name="userName" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={setValues}/>
                </div>
                <div class="mb-3">
                    <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={setValues}/>
                </div>
                <div class="mb-3">
                    <label htmlFor="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" name="password" class="form-control" id="exampleInputPassword1" onChange={setValues}/>
                </div>
                <div className="row mx-0 justify-content-end">
                    <button type="submit" className={`btn btn-primary col-4 col-md-2`}>
                        Register
                    </button>
                </div>
            </form>
        </>
    )
}

export default RegisterForm;