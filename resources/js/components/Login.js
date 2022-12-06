import React , { Component, useState } from "react";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/custom.css"; 
import ReactDOM from "react-dom";
import axios from "axios";
import swal from 'sweetalert';
import $ from 'jquery';





function Login() {
    const [loginInput,setLogin] = useState({
        email: '',
        password: '',
        error_list:[],
        
    });
    console.log(loginInput);
    

    const handeInput = (e)=>{
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value})
    }

        const loginSubmit =(e)=>{
            e.preventDefault();
    
            const data = {
                email:loginInput.email,
                password:loginInput.password
            }
            if (data.email==''){
                swal('warning','email is empty','warning');
                $('#emailerror').html('email is empty')
            }else{
    
             axios.post('api/admin_login', data).then(res=>{
              

                if(res.data.status===200){
                    console.log(res.data)
                    localStorage.setItem('auth_token',res.data.token);
                    localStorage.setItem('auth_name',res.data.username);
                    localStorage.setItem('auth_id',res.data.userid);
                    localStorage.setItem('isUserLogged',res.data.user_email);
                    swal("Success",res.data.message,"success");
                        window.location.href="/admin/dashboard";
                }else if(res.data.status===401){
                    swal("Warning",res.data.message,"warning");
                }else{
        setLogin({...loginInput, error_list:res.data.validation_errors})

                }
            
        });
    }
    }
    
    return (
        <div>   
             {(() => {
            if (localStorage.getItem('auth_token')){
            
                window.location.href="/admin/dashboard";           
        
            }  else {
                return (
            
                    <div className="row">
                    <div className="col-12 mainbox1 ">
                        <div className="row ">
                            <div className="col-md-6 p-xl-5 p-lg-5 p-md-3  ">

                                <h1 className="heading1"> Sign in</h1>
                                <form onSubmit={loginSubmit}>

                                    <div className="row">
                                        <div className="col-10 email-box1 marginTop_30">

                                            {/* Foem Section Start */}
                                            <div className="form-group1">
                                                <p type="Email" >
                                                    <input
                                                        type='text'
                                                        onChange={handeInput}
                                                        value={loginInput.email}
                                                        className="form-control1"
                                                        id="email"
                                                        placeholder="Enter email"
                                                        name="email"
                                                        maxLength="50"

                                                    />
                                                    <span className="text-danger" id="emailerror">{loginInput.error_list.email}</span>

                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-10 email-box1 marginTop_30">
                                            <div className="form-group1">
                                                <p type="Password" >
                                                    <input type="password"
                                                        onChange={handeInput}
                                                        value={loginInput.password}
                                                        className="form-control1" id="password"
                                                        placeholder="Enter password" name="password"
                                                        maxLength="30"

                                                    />
                                                    <span className="text-danger span">{loginInput.error_list.password}</span>

                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row marginTop_30 CheckBox-Forgot">
                                        <div className="col-1 margin1-82 form-check-input1">
                                            {" "}
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="flexCheckDefault"
                                            />
                                        </div>
                                        <div className="col-5 marginTop4per">
                                            <p>Keep me logged in</p>
                                        </div>
                                        <div className="col-4 marginTop4per">
                                            <a className="abc" href="">
                                                <h6 className="ForotPasswordText">forgot password</h6>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="row marginTop_30">
                                        <div className="col-10 marginL1-93">
                                            <button className="button" type="submit">Sign in </button>
                                        </div>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col-10 margin-FotterText1">
                                        <h5 className="heading5">
                                            If you don’t have an account please{" "}
                                            <a href="" className="abc">
                                                {" "}
                                                <span className="span">Sign up</span>
                                            </a>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 box21">
                                <div className="bgImage1"></div>
                            </div>
                        </div>
                    </div>
                </div>

                );
            }
            })()}
        
        </div>
        );
}

export default Login;

// DOM element
if (document.getElementById("login")) {
    ReactDOM.render(<Login />, document.getElementById("login"));
}
