import React , {useState} from 'react';
import sideBarcCntext from './../Context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner , faCamera , faUser , faEnvelope} from '@fortawesome/free-solid-svg-icons';
import db , {storage} from './../Fire Base/firebase';
import './form.css';

function ProfileForm(props){
    const [msg , setMsg] = useState("")
    const [spinner , setSpinner] = useState(false)
    const [btnSpinner , setBtnSpinner] = useState(false)

    async function handelFile(e , user , userUpdate) {
        setSpinner(true);
        const image = e.target.files;
        console.log(user , "file");
        await storage.ref(`user/${image[0].name}`).put(image[0]);
        await storage.ref().child(`user/${image[0].name}`).getDownloadURL().then((url) => {
            user.image = url;
            console.log(user)
        })
        await db.collection("user").doc(user.id).update(user).then(() => {
          userUpdate(user);
          setSpinner(false);
        }).catch((error) => {
            setMsg(error)
        })
    }

    function setValues(e, user){
        user[e.target.name] = e.target.value;
        console.log(user);
    }

    async function formSubmit(e  , user , userUpdate){
        e.preventDefault();
        setBtnSpinner(true);
        try{
            await db.collection("user").doc(user.id).update(user).then(async ()=>{
                await userUpdate(user);
                setBtnSpinner(false);
            })
        } catch(error){
            setMsg(error)
        }
        
    }

    return(
        <>
            <sideBarcCntext.Consumer>
                {
                    ({user , userUpdate }) =>{
                        if(user){
                            const {image , userName , email , phone , country} = user;
                            return(
                                <div className="container">
                                    <div className="row mx-0">
                                        <div className="col-12 col-lg-4 col-xl-3">
                                            <div className="mx-auto mx-lg-0 user-update-img" style={{backgroundImage: `url(${image})`}}>
                                                <div>{msg}</div>
                                                {(spinner? <div className="spinner d-flex align-items-center justify-content-center profile-image-spinner"><FontAwesomeIcon icon={faSpinner} /></div> : null)}
                                                <label htmlFor="formFile" className="d-flex align-items-center justify-content-center form-label"><FontAwesomeIcon icon={faCamera} /></label>
                                                <input className="form-control d-none" type="file" name="image" id="formFile" onChange={(e) => handelFile(e , user , userUpdate)}/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-8 col-xl-9 d-flex justify-content-center flex-column mt-1 mt-lg-0">
                                            <div className="user-details d-flex align-items-center justify-content-center justify-content-lg-start"><FontAwesomeIcon icon={faUser} />{userName}</div>
                                            <div className="user-details d-flex align-items-center justify-content-center justify-content-lg-start"><FontAwesomeIcon icon={faEnvelope} />{email}</div>
                                        </div>
                                    </div>
                                    <div className="profil-form">
                                        <form className="row mx-0" onSubmit={(e) => formSubmit(e , user , userUpdate)}>
                                            <div className="mb-3 col-12 col-lg-6">
                                                <label htmlFor="exampleInputEmail1" className="form-label">User Name:</label>
                                                <input type="text" className="form-control" name="userName" defaultValue={userName} onChange = {(e) =>setValues(e , user)}/>
                                            </div>
                                            <div className="mb-3 col-12 col-lg-6">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                                <input type="email" className="form-control" name="email" defaultValue={email} disabled onChange = {(e) =>setValues(e , user)}/>
                                            </div>
                                            <div className="mb-3 col-12 col-lg-6">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Phone:</label>
                                                <input type="text" className="form-control" name="phone" defaultValue={phone} onChange = {(e) =>setValues(e , user)}/>
                                            </div>
                                            <div className="mb-3 col-12 col-lg-6">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Country</label>
                                                <input type="text" className="form-control" name="country" defaultValue={country} onChange = {(e) =>setValues(e , user)}/>
                                            </div>
                                            <div className="row mx-0 justify-content-end">
                                                <button type="submit" className={`btn btn-primary col-4 col-md-2`}>
                                                    {(btnSpinner == true ?<span className="spinner"><FontAwesomeIcon icon={faSpinner} /></span>: null)} Save
                                                    </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )
                        }
                        
                    }
                }
            </sideBarcCntext.Consumer>
        </>
    )
}

export default ProfileForm;