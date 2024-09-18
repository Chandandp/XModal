import React, { useState } from 'react';
import './XModal.css'; // Import the CSS for styling

function XModal() {
  const [isOpen, setIsOpen] = useState(false); // To track modal open/close state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  // Open the modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Close the modal and reset the form and errors
  const closeModal = () => {
    setIsOpen(false);
    setFormData({ username: '', email: '', dob: '', phone: '' });
    setErrors({});
  };

  // Handle input changes and update form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Form validation logic
  const validate = () => {
    let validationErrors = {};
    if (!formData.username) validationErrors.username = 'Username is required';
    if (!formData.email.includes('@')) validationErrors.email = 'Invalid email. Please check your email address.';
    if (!formData.phone || formData.phone.length !== 10 || !/^\d+$/.test(formData.phone))
      validationErrors.phone = 'Invalid phone number. Please enter a 10-digit phone number.';
    if (new Date(formData.dob) > new Date()) validationErrors.dob = 'Invalid date of birth. Please enter a valid date.';
    
    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      closeModal();
      alert('Form submitted successfully');
    }
  };

  return (
    <div>
        <center>
        <h1>User Details Modal</h1>
      {/* Button to open modal */}
      <button onClick={openModal}>Open Form</button>
      </center>


      {/* Modal structure */}
      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
            <center>
              <div>
                
                <h3>Fill Details</h3>
                
                <label htmlFor="username"><h4>Username: </h4></label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p>{errors.username}</p>}
              </div>
              <div>
                <label htmlFor="email"><h4>Email: </h4></label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="dob"><h4>Date of Birth: </h4></label>
                <input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <p>{errors.dob}</p>}
              </div>
              <div>
                <label htmlFor="phone"><h4>Phone Number: </h4></label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p>{errors.phone}</p>}
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
              </center>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default XModal;
