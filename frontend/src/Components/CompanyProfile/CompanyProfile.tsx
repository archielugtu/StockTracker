import React, { useEffect, useState } from "react"
import { CompanyKeyMetrics } from "../../company"
import { useOutletContext } from "react-router-dom"
import { getKeyMetrics } from "../../api"
import RatioList from "../RatioList/RatioList"
import Spinner from "../Spinner/Spinner"

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
  const ticker = useOutletContext<string>()
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>()
  useEffect(() => {
    const getCompanyKeyMetrics = async () => {
      const value = await getKeyMetrics(ticker)
      console.log(value)
      setCompanyData(value?.data[0])
    }

    getCompanyKeyMetrics()
  }, [])
  return (
    <>
      {companyData ? (
        <RatioList data={companyData} config={tableConfig} />
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default CompanyProfile
