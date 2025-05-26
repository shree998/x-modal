import React, {useState} from 'react';
import './App.css';

function App() {

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);


  // Handler to close modal when clicking outside modal-content
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal')) {
      setShowModal(false);
    }
  };

  return (
    <div className="App" >
      <h1>User Details Modal</h1>
      <button onClick={() => setShowModal(true)}>Open Form</button>
           
      {showModal && (
        <div className="modal" onClick={handleBackdropClick}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Fill Details</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const userDetails = Object.fromEntries(formData.entries());
              console.log(userDetails);
              // Simulate an error for demonstration
              if (!/^\d{10}$/.test(userDetails.phone)) {
                setError('Invalid phone number. Please enter a 10-digit phone number!');
                alert('Invalid phone number. Please enter a 10-digit phone number!');
                return;
              } else if (new Date(userDetails.dob) > new Date()) {
                setError('Invalid date of birth. Date of birth cannot be in the future');
                alert('Invalid date of birth. Date of birth cannot be in the future');  
                return;
              } 
              else if( !userDetails.email) {
                setError('Invalid email. Please check your email address.');
                alert('Invalid email. Please check your email address.');
                return;
              }
              else {
                setError(null);
                alert('Form submitted successfully!');
                // Clear the form
                e.target.reset();
              }
            }}>
              <label>
                Username:
              </label>
              <input id='username' type="text" name="name" required />
              <br />
              <label>
                Email Address:
              </label>
              <input id='email' type="email" name="email" required />
              <br />
              <label>Phone Number:</label>
              <input id='phone' type="tel" name="phone" required/>
              <br />
              <label>Date of Birth:</label>
              <input id='dob' type="date" name="dob" required/>
              <br />
              {error && <p className="error">{error}</p>}
              <button className='submit-button' type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
