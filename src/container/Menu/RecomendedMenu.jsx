import React from 'react';
import Slider from 'react-slick';
import './RecomendedMenu.css';

const RecomendedMenu = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, 
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, 
        },
      },
    ],
  };

  return (
    <div className="recommended-menu">
      <h2 className='recommendation-heading'>Recommended for You</h2>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className="recommended-item">
            <img src={`http://192.168.3.178:8081/${item.Image}`} alt={item.Item_name} />
            <h3 className='item-name-heading'>{item.Item_name}</h3>
            <p>{item.Description}</p>
            <p>Price: ${item.Price}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RecomendedMenu;

