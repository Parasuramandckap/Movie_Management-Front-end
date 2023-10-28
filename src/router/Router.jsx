import { BrowserRouter,Route,Routes } from "react-router-dom";

import Register from "../components/register/Register";
import Login from "../components/login/Login";
import Home from "../components/home/Home";
import ImageUploader from "../components/home/image"

const AppRouter = () =>{
    
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/image" element={<ImageUploader />}></Route>

            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;