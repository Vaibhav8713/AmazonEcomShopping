import React, { useEffect, useState } from 'react'
import Subtotal from './Subtotal'

const Right = ({iteam}) => {

  const [price, setPrice] = useState();

  useEffect(()=>{
    totalAmount();
  }, [iteam]);

  const totalAmount = () => {
      let price=0;
      iteam.map((x)=>{
        price += x.price.cost;
      });
      setPrice(price);
  }

  return (
    <div className='right_buy'>
        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightimg" />
        <div className="cost_right">
            <p>Your order is eligible for FREE delivery</p> <br />
            <span style={{color: "#565959"}}>Select this option to checkout. Details</span>
            <h3>Subtotal ({iteam.length} item) : <strong style={{fontWeight: 700, color: "#111"}}>₹{price}.00</strong> </h3>
            <button className='rightbuy_btn'>Process to Buy</button>
            <div className="emi">
                EMI Available
            </div>
        </div>
    </div>
  )
}

export default Right