import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

    const [udata, setData] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });

    console.log(udata);

    const adddata = (e) => {
        const {name, value} = e.target;
        setData(()=>{
            return{
                ...udata,
                [name]: value
            }
        })
    }

    const senddata = async (e) => {
        e.preventDefault();

        const { fname, email, mobile, password, cpassword } = udata;
        
        try {
            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fname, email, mobile, password, cpassword })
            });

            const data = await res.json();
            console.log(data)

            if(res.status==422 || !data){
                toast.warn("invalid details", {
                    position: "top-center"
                })
            }
            else{
                setData({
                    ...udata, fname: "", email: "",
                    mobile: "", password: "", cpassword: ""
                });
                toast.success("data added successfully", {
                    position: "top-center"
                })
            }
        } catch (error) {
            console.log("front end ka catch error hai : " + error.message);
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
                    <form method="POST">
                        <h1>Sign-Up</h1>
                        <div className="form_data">
                            <label htmlFor="fname">Your Name</label>
                            <input type="text" name="fname" id="fname" onChange={adddata} value={udata.fname} />
                        </div>
                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" onChange={adddata} value={udata.email}/>
                        </div>
                        <div className="form_data">
                            <label htmlFor="number">Mobile</label>
                            <input type="text" name="mobile" id="mobile" onChange={adddata} value={udata.mobile}/>
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder='Atleast 6 characters' onChange={adddata} value={udata.password}/>
                        </div>
                        <div className="form_data">
                            <label htmlFor="cpassword">Re-Enter Password</label>
                            <input type="password" name="cpassword" id="cpassword" onChange={adddata} value={udata.cpassword}/>
                        </div>
                        <button className='signin_btn' onClick={senddata}>Continue</button>

                        <div className="signin_info">
                            <p>Already have an account ?</p>
                            <Link to='/login'>Click here</Link>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </section>
    </>
  )
}

export default SignUp