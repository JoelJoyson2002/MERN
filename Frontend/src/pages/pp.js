import './pp.css';
import FadeLoader from "react-spinners/FadeLoader";


export default function PP(){

    const handleRefresh = () => {
        window.location.reload();
      };
    
      return (
        <>
        
        <div className="loading" >Loading...<button className="Shoulders" onClick={handleRefresh}>
          Click Again to go to payment portal
        </button><br/>
        <FadeLoader
          color="orange"
          //loading={loading}
          className="custom-clip-loader"
          size={150}
          
          //aria-label="Loading Spinner"
          //data-testid="loader"
        />
        </div>
        </>
      );

}