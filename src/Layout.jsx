import { Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import DigitalCrypto from "./Components/DigitalCrypto";
import App from "./App";


export default function Layout() {

    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <DigitalCrypto />
            <Footer />
        </>
    )
}