import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Forgot from "../pages/auth/Forgot";
import Reset from "../pages/auth/Reset";
import Dashboard from "../pages/dashboard/Dashboard";
import Sidebar from "../components/sidebar/Sidebar";
import Layout from "../components/layout/Layout";
import AddProduct from "../pages/addProduct/AddProduct";
import ProductDetail from "../components/product/productDetail/ProductDetail";
import EditProduct from "../pages/editProduct/EditProduct";
import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";
import Contact from "../pages/contact/Contact";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/resetpassword/:resetToken" element={<Reset />} />
      <Route
        path="/dashboard"
        element={
          <Sidebar>
            <Layout>
              <Dashboard />
            </Layout>
          </Sidebar>
        }
      />
      <Route
        path="/add-product"
        element={
          <Sidebar>
            <Layout>
              <AddProduct />
            </Layout>
          </Sidebar>
        }
      />
      <Route
        path="/product-detail/:id"
        element={
          <Sidebar>
            <Layout>
              <ProductDetail />
            </Layout>
          </Sidebar>
        }
      />
      <Route
        path="/edit-product/:id"
        element={
          <Sidebar>
            <Layout>
              <EditProduct />
            </Layout>
          </Sidebar>
        }
      />
      <Route
        path="/profile"
        element={
          <Sidebar>
            <Layout>
              <Profile />
            </Layout>
          </Sidebar>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <Sidebar>
            <Layout>
              <EditProfile />
            </Layout>
          </Sidebar>
        }
      />
      <Route
        path="/contact-us"
        element={
          <Sidebar>
            <Layout>
              <Contact />
            </Layout>
          </Sidebar>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
