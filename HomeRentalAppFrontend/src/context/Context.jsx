import { createContext, useEffect, useState } from "react"
import axios from "axios";
import { jwtDecode } from "jwt-decode";

axios.defaults.withCredentials = true;
const HomeContext = createContext({
  data: [],
  fav: [],
  refreshData: () => { },
  updateFav: (id, value) => { },
  API: '',
  refreshAuth: () => { },
  isAuth: false,
  userDetails: [],
  ownerDetails: [],
  signoutHandle: () => { },
  isAddHouse: false,
  addHouseHandle: () => { },
  userDetailsData: () => { },
});

export const HomeProvider = ({ children }) => {
  const [data, setData] = useState([]);
  // const API = 'http://192.168.197.81:8080/';
  const API = 'http://localhost:8080/';
  const [isAuth, setIsAuth] = useState(false);
  const [isAddHouse, setIsAddHouse] = useState(true);
  const [userDetails, setUserDetails] = useState([])
  const [ownerDetails, setOwnerDetails] = useState([])

  const refreshData = async () => {
    if (isAuth) {
      await axios.get(API + 'products/all')
        .then((response) => {
          setData(response.data);
        }).catch((err) => {
          console.log("Error fetch data: ", err);
        })
    } else {
      console.log("data is empty ",isAuth)
    }
  }

  const userDetailsData = async () => {
    if (isAuth) {
      await axios.get(API + `auth/getDetails/${getUsername()}`).then((response) => {
        // console.log("Inside user details", userDetails, response.data)
        setUserDetails(response.data)
        localStorage.setItem("userId", response.data[2])
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  const ownerDetailsData = async () => {
    if (isAuth) {
      await axios.get(API + `owner/getOwner/${getUsername()}`).then((response) => {
        // console.log("Inside owner details ", ownerDetails, response.data)
        setOwnerDetails(response.data)
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  const updateFav = async (id, value) => {
    await axios.put(API + `api/san/updateFav/${id}/${value}`)
      .then(() => {
        refreshData()
      }).catch((err) => {
        console.log("Error fetch data: ", err);
      })
  }

  const signoutHandle = async () => {
    await axios.post(API + 'auth/logout')
    .then(() => {
      refreshAuth();
      window.location.href = '/login';
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    refreshAuth()
    userDetailsData();
    ownerDetailsData();
    refreshData();
  }, [isAuth])

  function getUsername() {
    const token = getCookie('jwt');
    try {
      const decoded = jwtDecode(token);
      return decoded.sub;
    } catch (err) {
      return 'demo';
    }
  }

  function isTokenValid() {
    const token = getCookie('jwt');
    try {
      const decoded = jwtDecode(token);
      // console.log(decoded.sub)
      return decoded.exp > Date.now() / 1000;
    } catch (err) {
      console.error('Error decoding token:', err);
      return false; // Token is invalid
    }
  }
  // Helper function to retrieve the token from cookies
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    // console.log(match)
    if (match) {
      return match[2]; // Returns the value of the cookie
    }
    return null; // If the cookie doesn't exist
  }

  const refreshAuth = () => {
    if (isTokenValid()) setIsAuth(true), console.log("Authendicated ", isAuth)
    else  setIsAuth(false), console.log("Not Authendicated")
  }

  const addHouseHandle = (val) => {
    // console.log("Add House value is, ",val)
    setIsAddHouse(val);
  }

  return (
    <HomeContext.Provider value={{ data, API, isAuth, userDetails, ownerDetails, isAddHouse, addHouseHandle, signoutHandle, refreshAuth, refreshData, updateFav }}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContext;