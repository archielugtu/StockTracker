import React, { useEffect, useState } from "react"
import { CompanyCashFlow } from "../../Types/company"
import { useOutletContext } from "react-router"
import { getCashflowStatement } from "../../api"
import Table from "../Table/Table"
import Spinner from "../Spinner/Spinner"
import { OutletContextType } from "../../Types/outlet"
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormatting"

type Props = {}

// const config = [
//   {
//     label: "Date",
//     render: (company: CompanyCashFlow) => company.date,
//   },
//   {
//     label: "Operating Cashflow",
//     render: (company: CompanyCashFlow) => company.operatingCashFlow,
//   },
//   {
//     label: "Investing Cashflow",
//     render: (company: CompanyCashFlow) =>
//       company.netCashProvidedByInvestingActivities,
//   },
//   {
//     label: "Financing Cashflow",
//     render: (company: CompanyCashFlow) =>
//       company.netCashProvidedByFinancingActivities,
//   },
//   {
//     label: "Cash At End of Period",
//     render: (company: CompanyCashFlow) => company.cashAtEndOfPeriod,
//   },
//   {
//     label: "CapEX",
//     render: (company: CompanyCashFlow) => company.capitalExpenditure,
//   },
//   {
//     label: "Free Cash Flow",
//     render: (company: CompanyCashFlow) => company.freeCashFlow,
//   },
// ]

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.operatingCashFlow),
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashProvidedByInvestingActivities),
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashProvidedByFinancingActivities),
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.capitalExpenditure),
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.commonStockIssuance),
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.freeCashFlow),
  },
]

const CashflowStatement = (props: Props) => {
  const { ticker } = useOutletContext<OutletContextType>()
  const [cashflowStatement, setCashflowStatement] =
    useState<CompanyCashFlow[]>()
  useEffect(() => {
    const cashflowStatementFetch = async () => {
      const result = await getCashflowStatement(ticker)
      console.log(result!.data)
      setCashflowStatement(result!.data)
    }
    cashflowStatementFetch()
  }, [])

  return (
    <>
      {cashflowStatement ? (
        <Table config={config} data={cashflowStatement} />
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default CashflowStatement
