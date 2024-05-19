import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import ClassDetails from "../Components/Class/ClassDetails";
import ProtectedRoute from "../Services/ProtectedRoute";
import SignIn from "../Components/Connection/SignIn";
import SignUp from "../Components/Connection/SignUp";
import ProgramDetails from "../Components/Class/ProgramDetails";
import CourseDetails from "../Components/Class/CourseDetails";
const token = localStorage.getItem("token");

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route exact path="/signup" element={<SignUp />} />
    
                {/* Route pour accéder à la page d'accueil */}
                <Route path="/home/" element={
                    <ProtectedRoute isAuthenticated={token}><Home />
                    </ProtectedRoute>
                } />

                {/* Route pour afficher les détails d'une classe */}
                <Route path="/classes/:id" element={<ClassDetails />} />
                <Route path="/programs/:id" element={<ProgramDetails/>} />
                <Route path="/courses/:id" element={<CourseDetails/>} />
            </Routes>
        </Router>
    );
};

export default App;
