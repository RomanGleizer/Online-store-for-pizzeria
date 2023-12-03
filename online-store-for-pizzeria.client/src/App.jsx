import { useEffect, useState } from 'react';
import './App.css';
import Home from "./Home";
import Payment from './Payment';
import Profile from './Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import PizzaDetails from './components/PizzaDetails';
import Cart from './components/Cart.jsx';
import Login from './components/Login';
import Register from './components/Register.jsx';
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
          path: "/payment",
          element: <Payment />,
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
          path: "/cart",
          element: <Cart />,
        },   
        {
          path: "/login",
          element: <Login />,
        },  
        {
          path: "/register",
          element: <Register />,
        },       
      ],
    }
  ]);
  
  function App() {
    return <RouterProvider router={router} />;
  }

export default App;