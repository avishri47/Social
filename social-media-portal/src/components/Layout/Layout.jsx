import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app">
   

      <div className="container">
        <Sidebar open={sidebarOpen} />
 
        <main className="content">{children}</main>
       
      </div>
    </div>
  );
};

export default Layout;