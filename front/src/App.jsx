import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import AuthVerify from "components/tools/AuthVerify"
import Checkout from "components/tools/Checkout"
import PrivateRoute from "components/tools/PrivateRoute"
import SignRoute from "components/tools/SignRoute"
import Cart from "pages/Cart"
import GeneralConditions from "pages/GeneralConditions"
import Home from "pages/Home"
import LegalNotices from "pages/LegalNotices"
import Login from "pages/Login"
import Order from "pages/Order"
import Orders from "pages/Orders"
import ProductList from "pages/ProductList"
import ProductPage from "pages/ProductPage"
import Register from "pages/Register"
import SentBack from "pages/SentBack"
import Success from "pages/Success"
import User from "pages/User"
import Wholesaler from "pages/Wholesaler"
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ScrollToTop from "./components/tools/ScrollToTop"

function App() {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)
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
          <Route path="/cgv" exact>
            <GeneralConditions />
          </Route>
          <Route path="/legal-notices" exact>
            <LegalNotices />
          </Route>
          <Route path="/sent-back" exact>
            <SentBack />
          </Route>
          <Route path="/wholesaler" exact>
            <Wholesaler />
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
