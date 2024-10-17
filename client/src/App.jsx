import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import SignUp from "./pages/SignUp"
import Header from "./components/Header"
import FooterCom from "./components/Footer"
import PrivateRoute from './components/PrivateRoute'
import Dashboard from "./pages/Dashboard"
import ScrollToTop from "./components/ScrollToTop"
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import UpdateProduct from "./pages/UpdateProduct"
import Category from "./pages/Category"
import bannermens from './assets/bannermens.png'
import bannerkids from './assets/bannerkids.png'
import bannerwomens from './assets/bannerwomens.png'
import ProductPage from "./pages/ProductPage"
import CartPage from "./pages/CartPage"
import Search from "./pages/Search"
import OrderPage from "./pages/OrderPage"

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/men" element={<Category category="men" banner={bannermens}/>}/>
      <Route path="/womens" element={<Category category="women" banner={bannerwomens}/>}/>
      <Route path="/kids" element={<Category category="kid" banner={bannerkids}/>}/>
      <Route path="/sign-in" element={<Signin/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/search" element={<Search/>} />

      <Route element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Route>
      <Route element={<OnlyAdminPrivateRoute/>}>
        <Route path="/update-product/:productId" element={<UpdateProduct/>}/>
        <Route path="/order/:orderId" element={<OrderPage/>} />
      </Route>
      <Route path="/product/:productSlug" element={<ProductPage/>}/>
      <Route path="/cart" element={<CartPage/>}/>
    </Routes>
    <FooterCom/>
    </BrowserRouter>
  )
}

export default App