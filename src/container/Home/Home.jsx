import React,{useState, useEffect} from 'react'
// import Services from '../OurServices/Services';
import Gallery from '../Gallery/Gallery';
import Header from '../Header/Header';
import RestaurantsCard from '../Restaurant/RestaurantsCard';


const Home = () => {
    const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://192.168.3.178:8081/api/all/restaurants');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);
  return (
    <div>
        <Header />
        <RestaurantsCard restaurants ={restaurants} />
        
        {/* <Services /> */}
        <Gallery />
    </div>
  )
}

export default Home;