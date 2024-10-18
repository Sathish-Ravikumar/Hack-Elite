import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // To store error messages
  const navigate = useNavigate();

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    // Check if email is valid
    if (!isValidEmail(email)) {
      alert('Invalid email address. Please enter a valid email.');
      return;
    }

    try {
      // Sending a POST request to save the user info
      const response = await axios.post('http://localhost:8080/users', {
        firstName,
        lastName,
        email,
        password,
      });

      console.log(response); // Log the entire response for debugging purposes

      if (response.status === 201) {
        alert('Signup successful!');
        navigate('/login'); // Redirect to login page
      } else {
        // If response is not 201, treat it as a failure
        alert('Signup failed. Please try again.');
      }

      // Clear form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      // Check if the error is related to the email (e.g., already registered)
      if (error.response && error.response.data) {
        if (error.response.data.message.includes('Email')) {
          setErrorMessage('The email address is invalid or already in use.');
        } else {
          setErrorMessage('Signup failed. Please try again.');
        }
      } else {
        // Log the detailed error for debugging
        console.error('Error signing up:', error.message);
        setErrorMessage('Network error. Please try again later.');
      }
      
      // Display the error message in a popup
      alert(errorMessage);
    }
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
}

export default Signup;
