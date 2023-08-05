import React from 'react'
import './newnav.css';

const Newnav = () => {
  return (
    <div className='new_nav'>
        <div className="nav_data">
            <div className="left_data">
                <p>All</p>
                <p>Mobile</p>
                <p>Bestseller</p>
                <p>Fashion</p>
                <p>Customer Services</p>
                <p>Electronics</p>
                <p>Prime</p>
                <p>Today's Deal</p>
                <p>Amazon Pay</p>
            </div>
            <div className="right_data">
                <img src="https://m.media-amazon.com/images/G/31/IN-Events/PD23/GW/SWM_400x39_launches_V2._CB602608776_.jpg" alt="nav" />
            </div>
        </div>
    </div>
  )
}

export default Newnav