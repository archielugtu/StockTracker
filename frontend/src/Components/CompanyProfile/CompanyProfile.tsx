import React, { useEffect, useState } from "react"
import { CompanyKeyMetrics } from "../../Types/company"
import { useOutletContext } from "react-router-dom"
import { getKeyMetrics } from "../../api"
import RatioList from "../RatioList/RatioList"
import Spinner from "../Spinner/Spinner"
import { OutletContextType } from "../../Types/outlet"
import {
  formatLargeNonMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting"

interface Props {}

//Specifies what company data we want to display when we use the RatioList
const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) =>
      formatLargeNonMonetaryNumber(company.marketCap),
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "P/E Ratio",
    render: (company: CompanyKeyMetrics) =>
      formatLargeNonMonetaryNumber(1 / company.earningsYieldTTM),
    subTitle:
      "Amount investors are willing to pay for each dollar of a company's earnings",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.currentRatioTTM),
    subTitle:
      "Measures the companies ability to pay short term debt obligations",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.returnOnEquityTTM),
    subTitle:
      "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: "Return On Assets",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.returnOnTangibleAssetsTTM),
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Graham Number",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.grahamNumberTTM),
    subTitle:
      "This is the upperbound of the price range that a defensive investor should pay for a stock",
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
