import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import NewCategory from "./pages/newCategory/NewCategory";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import CategoryList from "./pages/categoryList/CategoryList";
import Category from "./pages/category/Category";
function App() {
  const { currentUser } = useSelector(state => state.user)
  const admin = currentUser?.isAdmin || ""
  return (
    <Router>
      {!admin && <Redirect to="/login" />}
      <Switch>
        <Route exact path="/login">
          {admin ? <Redirect to="/" /> : <Login />}
        </Route>
        <div className="appContainer">
          <Topbar />
          <div className="main">
            <Sidebar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/users">
              <UserList />
            </Route>
            <Route exact path="/user/:userId">
              <User />
            </Route>
            <Route exact path="/newUser">
              <NewUser />
            </Route>
            <Route exact path="/products">
              <ProductList />
            </Route>
            <Route exact path="/categories">
              <CategoryList />
            </Route>
            <Route exact path="/newProduct">
              <NewProduct />
            </Route>
            <Route exact path="/newcategory">
              <NewCategory />
            </Route>
            <Route exact path="/product/:productId">
              <Product />
            </Route>
            <Route exact path="/category/:categoryId">
              <Category />
            </Route>
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
