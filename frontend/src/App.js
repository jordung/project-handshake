import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Error from "./pages/Error";

function App() {
  return (
    <div>
      <Routes>
        {/* Routes with Navbar */}
        <Route element={<Navbar />}>
          <Route path="/" element={<Landing />} />
        </Route>

        {/* Routes without Navbar */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
