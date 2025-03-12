import { AuthModal } from "../AuthModal"
import { Footer } from "../Footer"
import { Header } from "../Header"
import { Outlet } from "react-router-dom"

export const Layout = () => {
    return (
        <>
            <AuthModal />
            <Header />
            <main className="main">
                <Outlet />
            </main>
            <Footer />
        </>
    )

}