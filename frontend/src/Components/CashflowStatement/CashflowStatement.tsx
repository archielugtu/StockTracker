import React, { useEffect, useState } from "react"
import { CompanyCashFlow } from "../../company"
import { useOutletContext } from "react-router"
import { getCashflowStatement } from "../../api"
import Table from "../Table/Table"

type Props = {}

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) => company.operatingCashFlow,
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      company.netCashProvidedByInvestingActivities,
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      company.netCashProvidedByFinancingActivities,
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) => company.cashAtEndOfPeriod,
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) => company.capitalExpenditure,
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) => company.freeCashFlow,
  },
]

const CashflowStatement = (props: Props) => {
  const ticker = useOutletContext<string>()
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
        <div>Loading...</div>
      )}
    </>
  )
}

export default CashflowStatement
