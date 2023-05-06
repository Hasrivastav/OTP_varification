import React, { useState, useRef, useEffect } from 'react';
import '../styles/Home.css'
import  vg from '../assets/2.webp'
import bot from '../assets/images-removebg-preview.png'

function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const inputRefs = useRef([]);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleInput = (index, event) => {
    const value = event.target.value;
    if (!/^\d*$/.test(value)) {
      return; // Only allow numeric digits
    }

    if (value.length === 1) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value.length === 0) {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && event.target.value.length === 0) {
      event.preventDefault();
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (event.key === 'ArrowLeft') {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (event.key === 'ArrowRight') {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (event) => {
    const paste = event.clipboardData.getData('text/plain').slice(0, 6);
    for (let i = 0; i < paste.length && i < inputRefs.current.length; i++) {
      const input = inputRefs.current[i];
      input.value = paste.charAt(i);
      if (i < inputRefs.current.length - 1) {
        setTimeout(() => inputRefs.current[i + 1]?.focus(), 0);
      }
    }
    event.preventDefault();
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    
       
    <div className="popup-container" >

      {showPopup ? (
        <> 
        {/* <div>
        <img src={vg} alt="Graphics" />
    </div> */}
       
        <div className="popup">
          <h2 style={{textAlign: 'center' ,marginTop:'-10px'}}>Phone Verification</h2>
          <h3 style={{textAlign: 'center'}}>Enter the OTP  you recieved on 8920XXXXX:</h3>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="tel"
                pattern="\d*"
                maxLength={1}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onInput={(event) => handleInput(index, event)}
               
                onPaste={handlePaste}
              />
            ))}
          </div>
          <div  className='buttons_class' >
            <a href="#" >Change Number</a>
            <a href="#"  >Re-send OTP</a>
          </div>
          <div className='submit_button_class' >
            <button type="submit">Submit Now</button>
          </div>
        </div>
        </>
      ) : (
        <div className='verify'>
            <img  src={bot}/>
        <button className="verify-button"  onClick={handleShowPopup}>
          Click to Verify
        </button>
        </div>
      )}
    </div>

  
  );
  
}

export default Home;
