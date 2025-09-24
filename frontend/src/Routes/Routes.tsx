import { createBrowserRouter } from "react-router"
import App from "../App"
import HomePage from "../Pages/HomePage/HomePage"
import CompanyPage from "../Pages/CompanyPage/CompanyPage"
import SearchPage from "../Pages/SearchPage/SearchPage"
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile"
import IncomeStatements from "../Components/IncomeStatements/IncomeStatements"
import DesignGuide from "../Pages/DesignGuide/DesignGuide"
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet"
import CashflowStatement from "../Components/CashflowStatement/CashflowStatement"

//browser router - a factory that creates routes
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "design-guide", element: <DesignGuide /> },
      {
        path: "company/:ticker",
        element: <CompanyPage />,
        //nested routes of CompanyPage
        children: [
          { path: "company-profile", element: <CompanyProfile /> },
          { path: "income-statement", element: <IncomeStatements /> },
          { path: "balance-sheet", element: <BalanceSheet /> },
          { path: "cashflow-statement", element: <CashflowStatement /> },
        ],
      },
    ],
  },
])
