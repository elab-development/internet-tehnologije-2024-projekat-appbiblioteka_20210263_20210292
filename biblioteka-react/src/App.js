import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer";
import NavbarMenu from "./components/NavbarMenu";
import Header from "./components/Header";
import {Container} from "react-bootstrap";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyLends from "./pages/MyLends";
import {ToastContainer, Zoom} from "react-toastify";


function App() {
  return (
    <>
        <NavbarMenu/>
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/books" element={<Books/>} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin" element={<Admin/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/my-lends" element={<MyLends/>} />
                    <Route path="*" element={<Header title="404 Not Found"/>} />
                </Routes>
            </BrowserRouter>
        </Container>
        <Footer />

        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Zoom}
        />
    </>
  );
}

export default App;