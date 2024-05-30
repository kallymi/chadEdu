// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import ProtectedRoute from "../Services/ProtectedRoute";
import SignIn from "../Components/Connection/SignIn";
import React from 'react';
import NewCourse from '../Components/Course/NewCourse';
import NewProgram from '../Components/Course/NewProgram';
import AddCourseToProgram from '../Components/Course/AddCourseToProgram';
import AllCourse from "../Components/Course/AllCourse";
import AllPrograms from "../Components/Course/AllPrograms";
import NewClass from "../Components/Course/NewClass";
import AllClass from "../Components/Course/AllClass";
import EditCourse from "../Components/Course/EditCourse";
import EditClasse from "../Components/Course/EditClass";
import EditProgram from "../Components/Course/EditProgram";
import AddProgramToClass from "../Components/Course/AddProgramToClass";
import './App.css';
// import Programme from "../../../server/Models/Programme";
const token = localStorage.getItem("token");

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route
                    path="/home/"
                    element={
                        <ProtectedRoute isAuthenticated={token}>
                            <Home />
                            
                        </ProtectedRoute>
                    }
                />
                <Route path="/NewCourse" element={<NewCourse />} />
                <Route path="/NewProgram" element={<NewProgram/>} />
                
                <Route path="/All-courses" element={<AllCourse/>} />
                <Route path="/All-programs" element={<AllPrograms/>} />
                <Route path="/NewClass" element={<NewClass/>} />
                <Route path="/AddProgramToClass" element={<AddProgramToClass/>} />
                <Route path="/AllClass" element={<AllClass/>} />
                <Route path="/AddCourseToProgram" element={<AddCourseToProgram/>} />
                <Route path="/edit-course/:id" element={<EditCourse />} /> 
                <Route path="/edit-classe/:id" element={<EditClasse />} /> 
                <Route path="/edit-program/:id" element={<EditProgram />} /> 
            </Routes>

        </Router>
    );
};

export default App;
