import { useState } from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Chart from "./views/chart";
import Home from "./views/Home";


function App() {

    const [isOpen, setOpen] = useState(false);

    const toggleSidebar = () =>{
        console.log(isOpen);
        setOpen(!isOpen);
    }
    return ( 
        <Router>
            <Header setOpen = {toggleSidebar} />
            <div className="page-container container-full ">
                <Sidebar isOpen = {isOpen}  setOpen = {toggleSidebar} />
                <div className='page-content'>
                    
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/chart/:symbol" element={<Chart />} />
                        <Route path="/*" element={<Navigate to="/home" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;