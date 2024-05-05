import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import LikesPage from "./pages/LikesPage";

import Sidebar from "./components/Sidebar";
import { useAuthContext } from "./context/AuthContext";

function App() {
    const { loading } = useAuthContext();

    if (loading) return null;

    return (
        <div className="flex text-white">
            <Sidebar />
            <div className="max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1">
                <Routes>
                    <Route path="/" element={<HomePage />} />

                    <Route path="/explore" element={<ExplorePage />} />
                </Routes>
                <Toaster />
            </div>
        </div>
    );
}

export default App;
