import React, { useEffect, useState } from "react"
import { CompanyKeyMetrics } from "../../Types/company"
import { useOutletContext } from "react-router-dom"
import { getKeyMetrics } from "../../api"
import RatioList from "../RatioList/RatioList"
import Spinner from "../Spinner/Spinner"
import { OutletContextType } from "../../Types/Outlet"

interface Props {}

//Specifies what company data we want to display when we use the RatioList
const tableConfig = [
  {
    label: "Market Cap",
    subTitle: "Total value of all outstanding shares — shows company size",
    render: (company: CompanyKeyMetrics) => company.marketCap,
  },
  {
    label: "Current Ratio",
    subTitle: "Liquidity — ability to cover short-term obligations",
    render: (company: CompanyKeyMetrics) => company.currentRatioTTM,
  },
  {
    label: "Return On Equity",
    subTitle: "Profitability — returns generated from shareholders’ equity",
    render: (company: CompanyKeyMetrics) => company.returnOnEquityTTM,
  },
  {
    label: "Return on Assets",
    subTitle: "Efficiency — profit generated from total assets",
    render: (company: CompanyKeyMetrics) => company.returnOnAssetsTTM,
  },
  {
    label: "Current Ratio",
    subTitle:
      "Liquidity check — repeated here (consider replacing with another metric)",
    render: (company: CompanyKeyMetrics) => company.currentRatioTTM,
  },
]

const CompanyProfile = (props: Props) => {
  //useOutletContext() is a React Router hook that allows a child routes to get prop from a parent (in this case CompanyDashboard.tsx)
  const { ticker, companyDescription } = useOutletContext<OutletContextType>()
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getCompanyKeyMetrics = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const value = await getKeyMetrics(ticker)
        setCompanyData(value?.data[0])
      } catch (err: any) {
        if (err.response) {
          setError(`Server error: ${err.response.status} ${err.response.data}`)
        } else if (err.request) {
          setError("No response from server. Please check your connection.")
        } else {
          setError("Unexpected error occurred.")
        }
      } finally {
        setIsLoading(false)
      }
    }

    getCompanyKeyMetrics()
  }, [])
  return (
    <>
      <p className='bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4'>
        {companyDescription}
      </p>
      {companyData ? (
        <RatioList data={companyData} config={tableConfig} />
      ) : (
        <>
          <Spinner isLoading={isLoading} />
          {error && (
            <div className='bg-red-100 text-red-700 p-2 rounded m-4'>
              {error}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default CompanyProfile
