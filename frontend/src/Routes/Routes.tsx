import { createBrowserRouter } from "react-router"
import App from "../App"
import HomePage from "../Pages/HomePage/HomePage"
import CompanyPage from "../Pages/CompanyPage/CompanyPage"
import SearchPage from "../Pages/SearchPage/SearchPage"

//browser router - a factory that creates routes
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "company/:ticker", element: <CompanyPage /> },
    ],
  },
])
