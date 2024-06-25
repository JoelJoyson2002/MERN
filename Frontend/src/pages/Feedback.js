import { useState } from 'react';
import axios from 'axios';
import './Feedback.css'
import { useDispatch, useSelector } from 'react-redux';
import { CreateFeedback } from '../actions/empresponseAction';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const FeedbackForm = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch=useDispatch();
  const{bookid}=useParams();
  const navigate=useNavigate();

  const handleSubmit=(e)=>{
     e.preventDefault();
      dispatch(CreateFeedback(feedback,rating,bookid));
      navigate("/thankyou");
      
  }

  return (
    <div className="feedback-form">
      <h2>Enter Your Feedback</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="feedback" >Feedback:</label>
        <textarea
          id="feedback"
          className="Cashew"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <select
  id="rating"
  value={rating}
  onChange={(e) => setRating(parseFloat(e.target.value))}
  required
>
  <option value="">Select Rating</option>
  <option value="1">1</option>
  <option value="1.5">1.5</option>
  <option value="2">2</option>
  <option value="2.5">2.5</option>
  <option value="3">3</option>
  <option value="3.5">3.5</option>
  <option value="4">4</option>
  <option value="4.5">4.5</option>
  <option value="5">5</option>
</select>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default FeedbackForm;
