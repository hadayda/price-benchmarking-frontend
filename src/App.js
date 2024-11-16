// import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Base from './Base';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import UploadRates from './components/UploadRates'
import {useContext} from "react";
import {AuthContext} from "./AuthContext";

const PrivateRoute = ({children}) => {
    const token = localStorage.getItem('token');
    const { isAuthenticated } = useContext(AuthContext)
    return token && isAuthenticated ? children : <Navigate to="/login"/>;
};

function App() {
    return <Router>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Base/>}>
                <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                <Route path="/upload-rates" element={<PrivateRoute><UploadRates/></PrivateRoute>}/>
                <Route path="/" element={<Navigate to="/dashboard"/>}/>
            </Route>
        </Routes>
    </Router>
}

export default App;
