import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import './Login.scss';
import * as actions from "../../store/actions";
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Form, Dropdown } from 'react-bootstrap';  
import { handleLogin } from '../../services/UserService';
import ModalSignUp from './ModalSignUp';

import './Login.scss';
//import UserService  from '../../services/UserService';
import axios from 'axios';
import { userLoginSuccess } from '../../store/actions';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            isOpenModalSignUp:false,
        }
    }
    handleOnChangeUsername = (event)=>{
        this.setState({
            username: event.target.value
        })
         console.log(this.state.username)
    }

    handleOnChangepPassword = (event)=>{
        this.setState({
            password: event.target.value
        })
        // console.log(event.target.value)
    }
    handleSignUp = ()=>{
        this.setState({
            isOpenModalSignUp:true,
        })
    }
    toggleModalSignUp = () => {
        this.setState({
            isOpenModalSignUp : !this.state.isOpenModalSignUp,
        })
    }
    doSignUp = async (user) => {
       
        try{
            let res = await fetch("http://localhost:8080/users/add",{
                method : "POST",
                    headers : {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify({
                        name:user.name,
                        username:user.username,
                        password:user.password
                    })

                }).then((response) => response.json())
                    .then((responseJson) => {

                        console.log(responseJson);
                        if (responseJson.status=='ok'){
                            this.setState({
                                isOpenModalSignUp:false
                            })
                            
                        }
                        return responseJson.user;
                    });
            console.log('click save',user)
        }catch(e){
            console.log(e)
        }
    }
    handleLogin =  () =>{
        // e.preventDefault();
        this.setState({
            errMessage:''
        })

            //let data = await handleLogin(this.state.username, this.state.password);
            const user = {username : this.state.username,password : this.state.password};
            //console.log(user);

            const res = fetch("http://localhost:8080/login",{
                method : "POST",
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    username : this.state.username,
                    password : this.state.password
                })

            }).then((response) => response.json())
            .then((responseJson) => {

                console.log(responseJson);
                if (responseJson.status=='ok'){
                    this.props.userLoginSuccess(responseJson.data);
                    localStorage.setItem("user", JSON.stringify(responseJson.data));
                } else alert("Incorrect username or password !")
                return responseJson.user;
                });


    }
    render() {
        return (
            <body>
                <div className="container">
                    <ModalSignUp 
                        isOpen = {this.state.isOpenModalSignUp}
                        toggleFromParent={this.toggleModalSignUp}
                        signUp={this.doSignUp}
                    />
                    <div className="form sign-in-container">
                        <form action="#">
                            <h1>Sign in</h1>
                            <div className="social-container">
                                <a href="https://rpbloggers.com/"><i class="fab fa-facebook-f"></i></a>
                                <a href="https://rpbloggers.com/"><i class="fab fa-google-plus-g"></i></a>
                                <a href="https://rpbloggers.com/"><i class="fab fa-linkedin-in"></i></a>
                            </div>
                            <input type="text" 
                                    className='form-control' 
                                    placeholder="Username" 
                                    value={this.state.username}
                                    onChange={(event)=>this.handleOnChangeUsername(event)}/>
                            <input 
                                type="password" 
                                placeholder="Password"
                                value={this.state.password}
                                onChange={(event)=>this.handleOnChangepPassword(event)}/>
                            <a href="https://rpbloggers.com/">Forgot your password?</a>
                            <button
                            onClick={()=>{this.handleLogin()}}>Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-right">
                                <h1>Sign UP</h1>
                                <p>Sign up here if you don't have account.</p>
                                <button
                                onClick={()=>this.handleSignUp()}
                                className="signup_btn">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
