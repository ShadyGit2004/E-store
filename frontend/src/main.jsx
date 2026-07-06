
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import DataContextProvider from './context/DataContext.jsx';

createRoot(document.getElementById('root')).render(
  <DataContextProvider>
    <BrowserRouter>
      <App />
      <ToastContainer position={'top-center'}/>
    </BrowserRouter>
  </DataContextProvider>
)
