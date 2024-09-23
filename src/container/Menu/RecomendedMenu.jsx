import React from 'react';
import './RecomendedMenu.css';

const RecomendedMenu = ({items}) => {
  return (
    <div className="recommended-menu">
            <h2 className='recommendation-heading'>Recommended for You</h2>
            <div className="recommended-items">
                {items.map((item) => (
                    <div key={item.id} className="recommended-item">
                        <img src={`http://192.168.3.178:8081/${item.Image}`} alt={item.Item_name} />
                        <h3 className='item-name-heading'>{item.Item_name}</h3>
                        <p>{item.Description}</p>
                        <p>Price: ${item.Price}</p>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default RecomendedMenu;