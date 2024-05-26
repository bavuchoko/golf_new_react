import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Layout from "./layout/Layout";
import {HeaderContextProvider} from "./layout/context/HeaderContext";
import Login from "./packages/user/Login";
import Info from "./layout/Info";
import Home from "./layout/Home";
import Join from "./packages/user/Join";
import React from "react";
import List from "./packages/game/List";
import Test from "./layout/Test";
import FieldContainer from "./packages/field/FieldContainer";
import {Toaster} from "react-hot-toast";
import Quick from "./packages/game/Quick";
import Create from "./packages/game/Create";
import {useDispatch} from "react-redux";
import {setUsers} from "./redux/slice/userSlice";
import {logout} from "./redux/slice/authSlice";
import View from "./packages/game/View";
import FinalScore from "./packages/game/view/FinalScore";

function App() {
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('accessToken');
    let payload;
    if(accessToken && accessToken !== undefined){
        payload = accessToken.substring(accessToken.indexOf('.')+1,accessToken.lastIndexOf('.'));
        let userToken = decodeURIComponent(escape(window.atob(payload)));
        const user = userToken.trim().length>1 ? JSON.parse(userToken) : localStorage.removeItem('accessToken');
        dispatch(setUsers(user))
    }else{
        dispatch(logout())
    }
    const isLoggedIn = localStorage.getItem("accessToken") != null

    return (
        <>
            <HeaderContextProvider>
                <Toaster />
                <Router>
                    <Routes>
                        <Route path="/" element={isLoggedIn ? <Layout />: <Info />} >
                            <Route index element={ <Home />} />
                            <Route path="/game"  element={ <List />} />
                            <Route path="/game/:id"  element={ <View />} />
                            <Route path="/game/score/:id"  element={ <FinalScore />} />

                            <Route path="/field/:action"  element={ <FieldContainer />} />
                        </Route>
                        <Route path="/login"  element={ <Login />} />
                        <Route path="/join"  element={ <Join />} />
                        <Route path="/game/quick"  element={ <Quick />} />
                        <Route path="/game/create"  element={ <Create />} />
                        <Route path="/main" element={<Info />} />
                        <Route path="/test" element={<Test />} />
                    </Routes>
                </Router>
            </HeaderContextProvider>
        </>
    );
}

export default App;


