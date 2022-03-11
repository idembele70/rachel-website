import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import AuthVerify from "components/tools/AuthVerify"
import Checkout from "components/tools/Checkout"
import PrivateRoute from "components/tools/PrivateRoute"
import SignRoute from "components/tools/SignRoute"
import Cart from "pages/Cart"
import Home from "pages/Home"
import Login from "pages/Login"
import Order from "pages/Order"
import Orders from "pages/Orders"
import ProductList from "pages/ProductList"
import ProductPage from "pages/ProductPage"
import Register from "pages/Register"
import Success from "pages/Success"
import User from "pages/User"
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ScrollToTop from "./components/tools/ScrollToTop"

function App() {
  const stripePromise = loadStripe(
    REPLACE_WITH_YOUR_STRIPE_PK
  )
  return (
    <Router>
      <>
        <AuthVerify />
        <ScrollToTop />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/cart" exact>
            <Cart />
          </Route>
          <Route path="/products/:category" exact>
            <ProductList />
          </Route>
          <Route path="/product/:id" exact>
            <ProductPage />
          </Route>
          <SignRoute component={Login} path="/login" />
          <SignRoute component={Register} path="/register" exact />
          <PrivateRoute path="/success" component={Success} exact />
          <PrivateRoute path="/user" component={User} exact />
          <PrivateRoute path="/user/orders" component={Orders} exact />
          <PrivateRoute path="/user/order/:id" component={Order} exact />
          <Route path="/pay" exact>
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          </Route>
        </Switch>
      </>
    </Router>
  )
}
export default App
