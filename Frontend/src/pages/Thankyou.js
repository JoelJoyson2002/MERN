import React, { useEffect } from 'react';
import './Thankyou.css'
import { useSelector } from 'react-redux';

const ThankYouPage = () => {

    const{Received}=useSelector(state=>state.empresponseState);
    console.log(Received);

    useEffect(()=>{
        console.log("Received changed:", Received);


    },[Received])


  return (
    <>
    <div className="thank-you">
      <h2>Thank You for Your Feedback!</h2>
      <p>We appreciate your time and valuable feedback.</p>
    </div><br></br>

<img src="/images/emoji.jpeg" className="emoji" alt="not found"></img>

</>
  );
};

export default ThankYouPage;
