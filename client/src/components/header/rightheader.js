import React, { useContext } from 'react';
import './rightheader.css';
import { Avatar, Divider } from '@mui/material';
import { LoginContext } from '../context/ContextProvider';
import { Link } from 'react-router-dom';

const Rightheader = ({logclose}) => {

    const {account, setAccount} = useContext(LoginContext);

  return (
    <>
        <div className="rightheader">
            <div className="right_nav">
            {
                    account ? <Avatar className='avtar2'>{account.fname[0].toUpperCase()}</Avatar> : 
                              <Avatar className='avtar'></Avatar>
            }
            {
                account ? <h3>Hello, {account.fname.toUpperCase()} </h3> : ""
            }
            </div>
            <div className="nav_btn" onClick={()=>logclose()} >
                <Link to="/" > Home </Link>
                <Link to="/" > Shop by Category </Link>

                <Divider style={{width: "100%", marginLeft: "-20px"}} />

                <Link to="/" > Today's deal </Link>
                {
                    account ? <Link to="/buynow" > Your Orders </Link> : <Link to="/login" > Your Orders </Link>
                }

                <Divider/>

                <div className="flag">
                    <Link to="/" > Settings </Link>
                    <img src="" alt="indanFlagImage" />
                </div>
            </div>
        </div>
    </>
  )
}

export default Rightheader;