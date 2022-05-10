import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import BottomNavBar from "./components/NarBar/BottomNavBar";
import NavBar from "./components/NarBar/NavBar";
import Profile from "./components/Profile/Profile";
import TabNavBar from "./components/Tab/TabNavBar";
import TodoList from "./components/TodoList/TodoList";
import TodoPost from "./components/TodoPost/TodoPost";
import Home from "./Home";
import CreateTodo from "./pages/CreateTodo/CreateTodo";
import MusicPlaylist from "./pages/Music/MusicPlaylist";
import LoginSuccessful from "./pages/UserAuthentication/LoginSuccessful.";
import SignIn from "./pages/UserAuthentication/SignIn";
import SignUp from "./pages/UserAuthentication/SignUp";
import SignUpSuccessful from "./pages/UserAuthentication/SignUpSuccessful";

export default function App() {
  return (
    <div>
      <div>
        <Router>
          <NavBar />
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-todo" element={<CreateTodo />} />
              <Route path="/todo-list" element={<TodoList />} />
              <Route path="/music-play-list" element={<MusicPlaylist />} />
              <Route path="/todo-post" element={<TodoPost />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tab" element={<TabNavBar />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/signup-successful" element={<SignUpSuccessful />} />
              <Route path="/login-successful" element={<LoginSuccessful />} />
            </Routes>
          </div>
          <BottomNavBar />
        </Router>
      </div>
      <div>
        <Router></Router>
      </div>
    </div>
  );
}
