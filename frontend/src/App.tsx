import { Outlet } from "react-router"
import "./App.css"
import NavBar from "./Components/NavBar/NavBar"

// This component is defined as the parent component in Routes.tsx and gets rendered if the path is "/"
// If the path changes, child components will be rendered inside the <Outlet />
function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default App
