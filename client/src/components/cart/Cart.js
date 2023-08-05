import React, { useContext, useEffect, useState } from 'react'
import './cart.css';
import { Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import Navbaar from '../header/Navbaar';
import CircularProgress from '@mui/material/CircularProgress';


const Cart = () => {

    const {account, setAccount} = useContext(LoginContext);

    const {id} = useParams("");

    const navigate = useNavigate("");

    const [inddata, setInddata] = useState("");

    const getinddata = async() => {
        const res = await fetch(`/getproductsone/${id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        
        const data = await res.json();
        
        if(res.status !== 201){
            console.log("no data available");
        }
        else{
            console.log("get data");
            setInddata(data);
        }
    }

    useEffect(()=>{
        setTimeout(getinddata, 2000);
    }, [id]);

    // add cart function //
    const addtocart = async(id) => {
        const checkres = await fetch(`/addcart/${id}`,{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({inddata}),
            credentials: "include",
        })

        const data = await checkres.json(); // here we will receive the user , data=user
        console.log("=> frontend 'data' = " + data.carts.length);

        if(checkres.status===401 || !data){
            console.log("invalid user");
            alert("user invalid");
        }else{
            alert("data added into your cart");
            navigate("/buynow");
            setAccount(data);  // user is getting stored in setAccount
            console.log("=> account length = " + data.carts.length);
        }
    }

  return (
    <div className='cart_section'>
        {inddata && Object.keys(inddata).length && 
        <div className="cart_container">
            <div className="left_cart">
                <img src={inddata.detailUrl} alt="cart_img" />
                <div className="cart_btn">
                    <button className='cart_btn1' onClick={() => addtocart(inddata.id)}>Add to cart</button>
                    <button className='cart_btn2'>Buy Now</button>
                </div>
            </div>

            <div className="right_cart">
                <h3>{inddata.title.shortTitle}</h3>
                <h4>{inddata.title.longTitle}</h4>
                <Divider/>
                <p className="mrp">M.R.P : ₹{inddata.price.mrp}</p>
                <p>Deal of the Day : <span style={{color: '#B12704'}}>₹{inddata.price.cost}.00</span> </p>
                <p>You Save : <span style={{color: '#B12704'}}>₹{inddata.price.mrp - inddata.price.cost} ({inddata.price.discount})</span> </p>

                <div className="discount_box">
                    <h5>Discount : <span style={{color: '#111'}}>{inddata.discount}</span> </h5>
                    <h4>Free Delivery : <span style={{color: '#111', fontWeight: 600}}>Oct 8 - 21</span> Details</h4>
                    <p>Fastest Delivery : <span style={{color: '#111', fontWeight: 600}}>Tomorrow 11AM</span> </p>
                </div>

                <p className="description">About the Item : <span style={{color: '#565959',fontSize: 14,fontWeight: 500, letterSpacing: "0.4px"}}> {inddata.description} </span> </p>
            </div>
        </div>
        }
        {!inddata ? <div className='circle'>
            <CircularProgress/>
            <h2>Loading...</h2>
          </div> : ""}
    </div>
  )
}

export default Cart