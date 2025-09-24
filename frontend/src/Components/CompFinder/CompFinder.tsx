import React, { useEffect, useState } from "react"
import { CompanyComparableStock } from "../../Types/company"
import { getComparableStocks } from "../../api"
import CompFinderItem from "./CompFinderItem/CompFinderItem"
import Spinner from "../Spinner/Spinner"

interface Props {
  ticker: string
}

const CompFinder = ({ ticker }: Props) => {
  const [companyData, setCompanyData] = useState<CompanyComparableStock[]>()
  useEffect(() => {
    const comparableStocksFetch = async () => {
      const result = await getComparableStocks(ticker)
      setCompanyData(result!.data)
    }
    comparableStocksFetch()
  }, [ticker])

  return (
    <div className='inline-flex rounded-md shadow-sm m-4' role='group'>
      {companyData ? (
        companyData?.map(t => {
          return <CompFinderItem key={t.symbol} ticker={t.symbol} />
        })
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default CompFinder
