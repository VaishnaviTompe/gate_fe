import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./pages/Navbar";
import Quizok from "./pages/Quizok";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Success from "./pages/Success";
import QuestionGraph from "./pages/QuestionGraph";
import History from "./pages/History";
import QuestionBreakdown from "./pages/QuestionBreakdown";


const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("user");
  return isAuthenticated ? element : <Navigate to="/Signin" />;
};

function App() {

  const [examRunning, setExamRunning] = useState(false);

  // const PrivateRoute = ({ element }) => {
  //   const isAuthenticated = !!localStorage.getItem("user");
  //   return isAuthenticated && !examRunning ? (
  //     element
  //   ) : (
  //     <Navigate to="/Signin" />
  //   );
  // };

  return (
    <div className="App">
   
      <Router>
      <Navbar examRunning={examRunning} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route
            path="/Dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route path="/Quizok" element={<PrivateRoute element={<Quizok setExamRunning={setExamRunning} />} />} />
          <Route
            path="/Success"
            element={<PrivateRoute element={<Success />} />}
          />
          <Route
            path="/QuestionGraph"
            element={<PrivateRoute element={<QuestionGraph />} />}
          />
          <Route
            path="/History"
            element={<PrivateRoute element={<History />} />}
          />
          <Route
            path="/QuestionBreakdown"
            element={<PrivateRoute element={<QuestionBreakdown />} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
