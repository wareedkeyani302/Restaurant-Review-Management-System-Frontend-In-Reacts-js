// import React from 'react';
// import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import { Navbar } from './components';
// import { Footer } from './container';
// import './App.css';
// import Login from './container/Login/Login';
// import Home from './container/Home/Home';
// import About from './container/About/About';
// import Restaurants from './container/AllRestaurants/Restaurants';
// import Contact from './container/Contact/Contact';
// import Feedback from './container/Feedback/Feedback';
// import AdminDashboard from './components/Admin/AdminDashboard';
// import { useAuth } from './container/Authentication/AuthContext';
// import PrivateRoute from './container/Authentication/PrivateRoute';

// const App = () => {
//   const location = useLocation();
//   const { user } = useAuth();
//   const isLoginPage = location.pathname === '/login';
//   const isAdmin = user && user.role === 'admin';

//   return (
//     <div>
//       {!isLoginPage && !isAdmin && <Navbar />}
//       <Routes>
//         <Route
//           path='/login'
//           element={user ? <Navigate to={isAdmin ? "/admin/restaurants" : "/restaurants"} /> : <Login />}
//         />
//         <Route path="/" element={<PrivateRoute element={<Home />} />} />
//         <Route path="/about" element={<PrivateRoute element={<About />} />} />
//         <Route path="/restaurants" element={<PrivateRoute element={<Restaurants />} />} />
//         <Route path="/feedback" element={<PrivateRoute element={<Feedback />} />} />
//         <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
//         {isAdmin && (
//           <>
//             <Route path="/admin/*" element={<PrivateRoute element={<AdminDashboard />} requiredRole="admin" />} />
//           </>
//         )}
//         <Route path="*" element={<Navigate to={user && user.role !== 'admin' ? "/restaurants" : "/admin/restaurants"} />} />
//       </Routes>
//       {!isLoginPage && !isAdmin && <Footer />}
//     </div>
//   );
// };

// export default App;
import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components';
import { Footer } from './container';
import './App.css';
import Login from './container/Login/Login';
import Home from './container/Home/Home';
import About from './container/About/About';
import Restaurants from './container/AllRestaurants/Restaurants';
import Contact from './container/Contact/Contact';
import Feedback from './container/Feedback/Feedback';
import AdminDashboard from './components/Admin/AdminDashboard';
import { useAuth } from './container/Authentication/AuthContext';
import PrivateRoute from './container/Authentication/PrivateRoute';
import Registration from './components/Registration/Registration';

const App = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isLoginPage = location.pathname === '/login';
  const isRegistrationPage = location.pathname === '/registration';
  const isAdmin = user && user.role === 'admin';

  return (
    <div>
      {!isLoginPage && !isAdmin && !isRegistrationPage && <Navbar />}
      <Routes>
        <Route
          path='/login'
          element={user ? <Navigate to={isAdmin ? "/admin/restaurants" : "/home"} /> : <Login />}
        />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/feedback" element={<PrivateRoute element={<Feedback />} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/registration' element = {<Registration />} />
        {isAdmin && (
          <Route path="/admin/*" element={<PrivateRoute element={<AdminDashboard />} requiredRole="admin" />} />
        )}
        <Route path="*" element={<Navigate to={user && user.role !== 'admin' ? "/home" : "/admin/restaurants"} />} />
      </Routes>
      {!isLoginPage && !isAdmin && !isRegistrationPage && <Footer />}
    </div>
  );
};

export default App;

