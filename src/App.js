import {useSelector} from 'react-redux';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import Layout from "./layout/Layout";
import {HeaderContextProvider} from "./layout/context/HeaderContext";
import Login from "./packages/user/Login";
import Info from "./layout/Info";
import Join from "./packages/user/Join";

function App() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    return (
      <HeaderContextProvider>
      <Router>
        <Routes>
            <Route path="/" element={isLoggedIn ? <Layout />: <Navigate to='/main' />} >
                {/*<Route index element={ <Home />} />*/}
            </Route>
            <Route path="/login"  element={ <Login />} />
            <Route path="/join"  element={ <Join />} />
            <Route path="/main" element={<Info />} />
        </Routes>
      </Router>
      </HeaderContextProvider>
    );
}

export default App;
