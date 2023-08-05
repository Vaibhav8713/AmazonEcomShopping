import React, { useEffect, useState } from 'react';
import './buynow.css';
import { Divider } from '@mui/material';
import Option from './Option';
import Subtotal from './Subtotal';
import Right from './Right';

const Buynow = () => {

    const [cartdata, setCartdata] = useState("");
    console.log("cartdata = " + cartdata);

    const getdatabuy = async() => {
        const res = await fetch("/cartdetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const data = await res.json(); // data=user, here you will get the loggedIn user

        if(res.status !== 201){
            console.log("error");
        }
        else{
            setCartdata(data.carts); // here we are sending the carts ARRAY of the current loggedIn user to the cartdata state variable
        }
    }

    useEffect(()=>{
        getdatabuy();
    },[])


  return (
    <>
        {
            cartdata.length ? <div className='buynow_section'>
            <div className="buynow_container">
                <div className="left_buy">
                    <h1>Shopping Cart</h1>
                    <p>Select all items</p>
                    <span className='leftbuyprice'>Price</span>
                    <Divider/>
                    {
                        cartdata.map((e, k)=>{
                            return (
                                <>
                                    <div className="item_containert">
                                    <img src={e.detailUrl} alt="itemImage" />
                                    
                                    <div className="item_details">
                                        <h3>{e.title.longTitle}</h3>
                                        <h3>{e.title.shortTitle}</h3>
                                        <div className="diffrentprice">₹4049.00</div>
                                        <p className='unusuall'>usually dispatched in 8 days</p>
                                        <p>Eligible for FREE Shipping</p>
                                        <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="amazon_fullfilledLogo" />
                                        <Option deletedata={e.id} get={getdatabuy} />
                                    </div>

                                    <h3 className="item_price">₹{e.price.cost}.00</h3>
                                </div>
                                <Divider/>
                                </>
                            )
                        })
                    }
                    <Subtotal iteam={cartdata} />
                </div>
                <Right iteam={cartdata} />
            </div>
        </div> :  ""
        }
    </>
  )
}

export default Buynow