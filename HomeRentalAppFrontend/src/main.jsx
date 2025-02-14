import React  from 'react'
import ReactDOM from "react-dom/client";
import { HomeProvider } from './context/Context.jsx'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HomeProvider>
      <App />
    </HomeProvider>
  </React.StrictMode>
)
