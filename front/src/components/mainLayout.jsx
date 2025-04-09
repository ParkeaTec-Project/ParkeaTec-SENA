import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import HeaderLogin from "../components/HeaderLogin";
import Footer from "../components/Footer";

const MainLayout = ({ isAuthenticated }) => {
    return (
        <>
            { isAuthenticated ? <Header /> : <HeaderLogin />}
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;