import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { AuthProvider, useAuth } from "./contexts/UserContext";
import { CreateNote } from "./pages/Notes/CreateNote";
import { NoteById } from './pages/Notes/NoteById'
import { SavedNotesPage } from "./pages/SavedNotes/SavedNotesPage";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
          <Route path="/notes/saves" element={isLoggedIn ? <SavedNotesPage /> : <Login />} />
          <Route path="/login" element={isLoggedIn ? <Home /> : <Login />} />
          <Route
            path="/register"
            element={isLoggedIn ? <Home /> : <Register />}
          />
          <Route
            path="/create/note"
            element={isLoggedIn ? <CreateNote /> : <Login />}
          />
          <Route path="/note/:id" element={isLoggedIn ? <NoteById /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function AuthenticatedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AuthenticatedApp;
