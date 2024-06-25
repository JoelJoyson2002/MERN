import React from 'react';
import '../pages/electricalDelhi.css';
import { Link } from 'react-router-dom';

const ElectricalDelhiPartition = ({ plumber }) => {
    const generateStars = (rating) => {
        const maxRating = 5; // Maximum rating (number of stars)
        const filledStars = Math.min(rating, maxRating); // Calculate the number of filled stars
        const unfilledStars = maxRating - filledStars; // Calculate the number of unfilled stars
      
        const starElements = [];
      
        for (let i = 0; i < filledStars; i++) {
          starElements.push(<div key={i} className="filled">&#9733;</div>);
        }
      
        for (let i = 0; i < unfilledStars; i++) {
          starElements.push(<div key={i + filledStars} className="star-h">&#9733;</div>);
        }
        console.log(starElements)
        return starElements;
      };
      const rating = plumber.star_rating; // Replace with your actual star rating
      
const stars = generateStars(rating);
let path=plumber.images[0].Filename.split("/");

  return (
    <div className="partition">
      <img src={`/images/${path[path.length-1]}`}  className="image" alt="not found" /><br></br>
      <span className="name">{plumber.name}</span><br></br>
      <span className="age">{`age: ${plumber.age}`}</span><br></br>
      <div className="rating">{stars}</div>
      <span className="rating">{`(${plumber.numofreviews} Reviews)`}</span>
      <Link to={`/emp/empid/${plumber._id}`}><button className="view-details-button">View Details</button></Link>
    </div>
  );
};

export default ElectricalDelhiPartition;
