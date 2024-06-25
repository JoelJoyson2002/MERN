import EmployeeDetails from "./employeeDetails";


const StarRating=(rating)=>{


        console.log("rating",rating);
        const maxRating = 5; // Maximum rating (number of stars)
        const filledStars = Math.min(rating.arg, maxRating); // Calculate the number of filled stars
        const unfilledStars = maxRating - filledStars; // Calculate the number of unfilled stars
      
        const starElements = [];
      
        for (let i = 0; i < filledStars; i++) {
          starElements.push(<div key={i} className="filled">&#9733;</div>);
        }
      
        for (let i = 0; i < unfilledStars; i++) {
          starElements.push(<div key={i + filledStars} className="star-h">&#9733;</div>);
        }
        //console.log(starElements)

        return starElements
        
        
      }
      
      export default StarRating;
   

