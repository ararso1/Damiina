import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LiveOnlineSessions from "./pages/LiveOnlineSessions";
import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Books from "./pages/Books";
import Blogs from "./pages/Blogs";
import CourseRegistration from "./components/CourseRegistration";
import "./App.css";
import './pages/all.css'

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <main>
          <Routes>
            <Route path="/" element={<><Header /><Home /></>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/books" element={<Books/>} />
            <Route path="/blogs" element={<Blogs/>} />
            <Route path="/online-sessions" element={<LiveOnlineSessions />} />
            <Route path="/course-registration" element={<CourseRegistration />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
