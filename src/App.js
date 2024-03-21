import logo from './logo.svg';
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import Layout from "./layout/Layout";
import {HeaderContextProvider} from "./layout/context/HeaderContext";

function App() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
  return (
      <HeaderContextProvider>
      <Router>
        <Routes>
            <Route path="/" element={<Layout />} >
            </Route>
          <Route />
        </Routes>
      </Router>
      </HeaderContextProvider>
  );
}

export default App;
