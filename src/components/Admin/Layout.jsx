import React from 'react'
import Navbar from '../Navbar/Navbar';
import AdminFooter from './AdminFooter';

const Layout = ({children}) => {
  return (
    <div>
        <Navbar />
        {children}
        <AdminFooter/>
    </div>
  )
}

export default Layout;