import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from "./components/product/ProductDetails";

import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadUSer } from "./actions/userActions";
import store from './store';

function App() {

  useEffect(() => {
    store.dispatch(loadUSer())
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" Component={Home} exact />
            <Route path="/search/:keyword" Component={Home} />
            <Route path="/product/:id" Component={ProductDetails} exact />

            <Route path="/cart" Component={Cart} exact />
            <Route element={<ProtectedRoute />}>
              <Route path="/shipping" element={<Shipping />} />
            </Route>
            
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/password/forgot" Component={ForgotPassword} exact />
            <Route path="/password/reset/:token" Component={NewPassword}/>

            <Route element={<ProtectedRoute />}>
              <Route path="/me" element={<Profile />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/me/update" element={<UpdateProfile />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/password/update" element={<UpdatePassword />} />
            </Route>

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
