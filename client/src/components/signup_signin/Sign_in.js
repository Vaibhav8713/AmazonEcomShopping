import React, { useContext, useState } from 'react';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';

const Sign_in = () => {

    // const { account, setAccount } = useContext(LoginContext);

    const navigate = useNavigate();

    const [logdata, setData] = useState({
        email: "",
        password: ""
    })

    const adddata = (e) => {
        const {name, value} = e.target;
        setData(()=>{
            return{
                ...logdata,
                [name]: value
            }
        })
    }

    const senddata = async(e) => {
        e.preventDefault();

        const {email, password} = logdata;
        console.log(logdata);

        try {
            const res = await fetch("/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            })
    
            const data = await res.json();
            
            if(res.status==400 || !data){
                toast.warn(data.error + " 👎!", {
                    position: "top-center"
                })
            }
            else{
                toast.success("logged in successfully 😃!", {
                    position: "top-center"
                });
                setData({email: "", password: ""})
                // setAccount(data);
            }
        } catch (error) {
            console.log("login page ka error" + error.message);
        }
    }

  return (
    <>
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="https://i0.wp.com/cultofcalcio.com/wp-content/uploads/2021/01/amazon.png?fit=2048%2C1536&ssl=1" alt="amazonLogo" />
                </div>
                <div className="sign_form">
                    <form method='POST'>
                        <h1>Sign-In</h1>
                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" onChange={adddata} value={logdata.login} />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder='Atleast 6 characters' onChange={adddata} value={logdata.password} />
                        </div>
                        <button className='signin_btn' onClick={senddata}>Continue</button>
                    </form>
                </div>

                <div className="create_accountinfo">
                    <p>New to Amazon ?</p>
                    <Link to='/register'><button>Create your Amazon account</button></Link>
                </div>
            </div>
            <ToastContainer/>
        </section>
    </>
  )
}

export default Sign_in