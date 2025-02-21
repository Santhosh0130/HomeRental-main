import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import './css/colors.min.css'
import AppNavBar from './components/AppNavBar.jsx'
import AppHome from './components/AppHome.jsx'
import HomeDetail from './components/HomeDetail.jsx'
import { createContext, useState, useEffect, useContext } from 'react'
import HomeContext, { HomeProvider } from './context/Context'
import AppCart from './components/AppCart.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import { jwtDecode } from 'jwt-decode';
import Loading from './components/react-components/Loading.jsx'
import AddHouse from './components/AddHouse.jsx'
import OwnerDetailsForm from './components/OwnerRegister.jsx'
import SearchFilter from './components/SearchFilter.jsx'
import MyHouses from './components/MyHouses.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export const HomeContext = createContext();

// axios.defaults.withCredentials = true;
function App() {


  const { data, isAuth, refreshAuth } = useContext(HomeContext);
  const [loading, setLoading] = useState(true);

  // const [isAuth, setIsAuth] = useState(false);

  // function isTokenValid() {
  //   const token = getCookie('jwt');
  //   try{
  //     const decoded = jwtDecode(token);
  //     console.log(decoded)
  //     return decoded.exp > Date.now() / 1000; 
  //   } catch(err) {
  //     console.error('Error decoding token:', err);
  //     return false; // Token is invalid
  //   }
  // }
  // // Helper function to retrieve the token from cookies
  // function getCookie(name) {
  //   const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  //   // console.log(match)
  //   if (match) {
  //     return match[2]; // Returns the value of the cookie
  //   }
  //   return null; // If the cookie doesn't exist
  // }

  // const refreshAuth = () => {
  //   if (isTokenValid()) console.log("Authendicated"), setIsAuth(true)
  //   else console.log("Not Authendicated"), setIsAuth(false)
  // }

  // useEffect(() => {
  //       if (isTokenValid()) console.log("Authendicated"), setIsAuth(true)
  //       else console.log("Not Authendicated"), setIsAuth(false)
  // }, [isAuth])

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/api/san/all`)
  //     .then(response => {
  //       setAllData(response.data)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     });
  // }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  return (
    <>
      {/* <HomeContext.Provider value={{ allData, setAllData }}> */}
      <HomeProvider>
        <BrowserRouter>
        <ToastContainer />
          {/* {isAuth && data.length !== 0 ? */}
          {/* {isAuth && data.length >= 0 ? */}
          {isAuth ?
            <>
              <AppNavBar />
              <Routes>
                {/* <Route path='/home' element={<Welcome />}></Route> */}
                {/* <Route path='/' element={<AppHome />}></Route> */}
                {/* <Route path='/home' element={<Welcome />}></Route> */}
                <Route path='/' element={loading ? <Loading /> : <AppHome />}></Route>
                <Route path='/home' element={<AppHome />}></Route>
                {/* {loading ? <Loading /> : <Route path='/home' element={<AppHome />}></Route>} */}
                <Route path='/det/:id' element={<HomeDetail />}></Route>
                <Route path='/cart' element={<AppCart />}></Route>
                <Route path='/addHouse' element={<AddHouse />}></Route>
                <Route path='/updateHouse' element={<AddHouse />}></Route>
                <Route path='/ownerRegister' element={<OwnerDetailsForm />}></Route>
                <Route path='/filter' element={<SearchFilter />}></Route>
                <Route path='/myHouses' element={<MyHouses />}></Route>
              </Routes>
            </> :
            <Routes>
              <Route path='/login' element={<Login refreshAuth1={refreshAuth} />} />
              <Route path='/' element={loading ? <Loading /> : <Login refreshAuth1={refreshAuth} />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          }
        </BrowserRouter>
      </HomeProvider>
      {/* </HomeContext.Provider> */}
      {/* <Container fluid>
        <Row>
        <Col className='border p-0 m-0'>
        <div className="bg-primary d-flex justify-content-md-between align-items-center px-3">
          <div className="fw-bold fs-5 me-5">Hello</div>
          <div>
            <div className='my-5'>From Java</div> 
            <ul className='list-inline d-inline-flex gap-3 m-0 py-3'>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        </Col>
        </Row>
      </Container> */}
    </>
  )
}

export default App
