import { useEffect , useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from "./components/product/ProductDetails";

// Cart imports
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import { ConfirmOrder } from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";

// Order imports
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

// Auth or User imports
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

// Admin imports
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";

import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadUSer } from "./actions/userActions";
import { useSelector } from 'react-redux'
import store from './store';
import axios from "axios";


//payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUSer())

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);
      
    }
    getStripeApiKey();
  }, [])

  const { user, loading } = useSelector(state => state.auth)

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
              <Route path="/order/confirm" element={<ConfirmOrder />} />
              <Route path="/success" element={<OrderSuccess />} />
              {stripeApiKey && (
                <Route path="/payment"
                  element={
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Payment />
                    </Elements>
                  } 
                />
              )}
            </Route>

            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/password/forgot" Component={ForgotPassword} exact />
            <Route path="/password/reset/:token" Component={NewPassword}/>

            <Route element={<ProtectedRoute />}>
              <Route path="/me" element={<Profile />} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/password/update" element={<UpdatePassword />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/orders/me" element={<ListOrders />} exact />
              <Route path="/order/:id" element={<OrderDetails />} exact />
            </Route>

          </Routes>

        </div>
        
        <Routes>
          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/dashboard" element={<Dashboard />} exact />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/products" element={<ProductsList />} exact />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/product" element={<NewProduct />} exact />
          </Route>
          <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin/product/:productId" element={<UpdateProduct />} exact />
          </Route>
        </Routes>
        
        {!loading && user.role !== 'admin' && (
            <Footer />
        )}
      </div>
    </Router>
  );
}

export default App;
