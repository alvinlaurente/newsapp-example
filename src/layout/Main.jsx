import { Outlet } from "react-router-dom"
import { Navbar } from "../components"

const Main = () => {

    return (
        <div>
            <div>
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}

export default Main