import React, { useEffect, useState } from 'react'

const Subtotal = ({iteam}) => {  // iteam = cartdata = lists of products in cart

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
    <div className='sub_item'>
        <h3>Subtotal ({iteam.length} item) : <strong style={{fontWeight: 700, color: "#111"}}>₹{price}.00</strong> </h3>
    </div>
  )
}

export default Subtotal