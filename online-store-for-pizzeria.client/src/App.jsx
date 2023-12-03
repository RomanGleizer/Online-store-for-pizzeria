import { useEffect, useState } from 'react';
import './App.css';
import Home from "./Home";
import Cart from './Cart';
import Profile from './Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import PizzaDetails from './components/PizzaDetails';
import CartModal from './components/CartModal';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
  } from 'react-router-dom';

  const AppLayout = () => (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
  
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/products/:id",
          element: <PizzaDetails />,
        },
        {
          path: "/cartmodal",
          element: <CartModal />,
        },   
        // {
        //   path: "/login",
        //   element: <Login />,
        // },  
        // {
        //   path: "/register",
        //   element: <Register />,
        // },       
      ],
    }
  ]);
  
  function App() {
    return <RouterProvider router={router} />;
  }

export default App;