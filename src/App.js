import logo from './logo.svg';
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import './App.css';

function App() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
  return (
      <Router>
        <Routes>

          <Route />
        </Routes>
      </Router>
  );
}

export default App;
