import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import Layout from "./layout/Layout";
import {HeaderContextProvider} from "./layout/context/HeaderContext";
import Login from "./packages/user/Login";
import Info from "./layout/Info";
import Home from "./layout/Home";
import Join from "./packages/user/Join";
import React from "react";
import List from "./packages/game/list/List";
import Test from "./layout/Test";

function App() {

    const isLoggedIn = localStorage.getItem("accessToken") != null

    return (
        <>
            <HeaderContextProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={isLoggedIn ? <Layout />: <Info />} >
                            <Route index element={ <Home />} />
                            <Route path="/game"  element={ <List />} />
                            <Route path="/game/create"  element={ <Home />} />
                        </Route>
                        <Route path="/login"  element={ <Login />} />
                        <Route path="/join"  element={ <Join />} />
                        <Route path="/main" element={<Info />} />
                        <Route path="/test" element={<Test />} />
                    </Routes>
                </Router>
            </HeaderContextProvider>
        </>
    );
}

export default App;


