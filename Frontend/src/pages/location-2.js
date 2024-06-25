import MetaData from '../MetaData';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CustomDropdown from './customdropdown';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FadeLoader from "react-spinners/FadeLoader";
import './location-2.css';

const LocationsSecond = () => {
    const { user, isAuthenticated } = useSelector(state => state.authState);
    const navigate = useNavigate();
    
    const handleServiceClick = (service) => {
        navigate(`/chooseservices/${service}`);
    };

    if (!isAuthenticated) {
        return (
            <div className="loading">
                Loading...<br />
                <FadeLoader color="orange" className="custom-clip-loader" size={150} /><br />
                <button className="shit" onClick={() => { console.log('Button clicked'); navigate('/login'); }}>Click here to go to login page</button>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const citiesIndia1 = [
        'Ahmedabad',
        'Bangalore',
        'Lucknow',
        'Chennai',
        'Hyderabad',
        'Bhubaneswar',
        'Kolkata'
    ];

    const citiesIndia2 = [
        'Pune',
        'Surat',
        'Karnataka',
        'Mumbai',
        'Coimbatore',
        'Delhi',
        'Noida'
    ];

    return (
        <>
            <div className="Rambutan">
                <MetaData title={'choose location'} />
                <div className="navbar">
                    <div className="icon">
                        <img src="/images/image3.jpg" className="image1" alt="not found" />
                    </div>
                    <div className="menu">
                        <ul>
                            <li><Link to={`/`}>Home</Link></li>
                            <li><Link to={`/aboutus`}>About us</Link></li>
                            <li><Link to={`/ourservices`}>Our Services</Link></li>
                            <li><Link to={`/contactus`}>Contact Us</Link></li>
                            {isAuthenticated ?
                                <div className="afterlogin">
                                    <CustomDropdown />
                                </div>
                                :
                                <Navigate to='/login' />
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <div className="G">
                <div className="H">
                    <h2>Choose the Location you want</h2>
                </div>
            </div>

            <div className="popup-container">
                <div className="popup-box">
                    <h2>Choose a Location</h2>
                    <div className="half">
                        {citiesIndia1.map((city, index) => (
                            <div className="box" key={index} onClick={() => handleServiceClick(city)}>
                                <span className="letters">{city}</span>
                            </div>
                        ))}
                    </div>
                    <div className="half">
                        {citiesIndia2.map((city, index) => (
                            <div className="box" key={index} onClick={() => handleServiceClick(city)}>
                                <span className="letters">{city}</span>
                            </div>
                        ))}
                    </div>
                    <p>Other Cities Coming Soon....</p>
                </div>
            </div>
        </>
    );
};

export default LocationsSecond;
