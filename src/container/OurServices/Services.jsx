import React from 'react'
import './Services.css';
import Update from '../../assets/Update.jpg';
import Manage from '../../assets/Manage.jpg';
import Rate from '../../assets/Rate.jpg';

const Services = () => {
  return (
    <div className='services-container'>
      <div className='service card'>
        <div className='service-card-content'>
            <img src={Manage} alt='card img' />
            <div className='service-card-description'>
                <h3 className='service-card-heading'>Manage Restaurants</h3>
                <p className='service-card-info'>Add, update and remove restaurants easily.</p>
            </div>
            <button type='button' className='manage-button'>Manage</button>
        </div>
      </div> 
      <div className='service card'>
        <div className='service-card-content'>
            <img src={Update} alt='card img' />
            <div className='service-card-description'>
                <h3 className='service-card-heading'>Update Menus</h3>
                <p className='service-card-info'>Keep your restaurant menus up to date with ease.</p>
            </div>
            <button type='button' className='manage-button'>Update</button>
        </div>
      </div>  
      <div className='service card'>
        <div className='service-card-content'>
            <img src={Rate} alt='card img' />
            <div className='service-card-description'>
                <h3 className='service-card-heading'>Rate & Review</h3>
                <p className='service-card-info'>Customer can rate and review their favorite dishes.</p>
            </div>
            <button type='button' className='manage-button'>Rate Now</button>
        </div>
      </div>   
    </div>
  )
}

export default Services;