import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Products from "./pages/Product/Products";
import ProductForm from "./pages/Product/ProductForm";
import Categories from "./pages/Category/Categories";
import Brands from "./pages/Brand/Brands";

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { loadUser } from "./actions/userActions";
import store from "./store";
import ProductSingle from "./pages/Product/ProductSingle";

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route path="/product/:id" element={<ProductSingle />} />
        <Route path="/product/create" element={<ProductForm />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/brands" element={<Brands />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
