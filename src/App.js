import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Layout from "./layout/Layout";
import {HeaderContextProvider} from "./layout/context/HeaderContext";
import Login from "./packages/user/Login";
import Info from "./layout/container/Info";
import Home from "./layout/container/Home";
import Join from "./packages/user/Join";
import React, {useEffect} from "react";
import List from "./packages/game/List";
import FieldContainer from "./packages/field/FieldContainer";
import {Toaster} from "react-hot-toast";
import Quick from "./packages/game/Quick";
import Create from "./packages/game/Create";
import {useDispatch, useSelector} from "react-redux";
import {setUsers} from "./redux/slice/userSlice";
import {logout} from "./redux/slice/authSlice";
import View from "./packages/game/View";
import FinalScore from "./packages/game/view/FinalScore";
import LoadingModal from "./components/modal/LoadingModal";
import ErrorModal from "./components/modal/ErrorModal";

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

    const status = useSelector(status=>status.api)
    let vh = 0;
    useEffect(() => {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, []);

    return (
        <>
            {status.isLoading && <LoadingModal />}
            {status.error && <ErrorModal />}
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
                        <Route path="/game/quick"  element={isLoggedIn? <Quick /> : <Login />} />
                        <Route path="/game/create"  element={isLoggedIn? <Create />: <Login />} />
                        <Route path="/main" element={<Info />} />
                    </Routes>
                </Router>
            </HeaderContextProvider>
        </>
    );
}

export default App;


