import React, { useEffect, useState } from "react"
import { CompanyIncomeStatement } from "../../Types/company"
import { useOutletContext } from "react-router-dom"
import { getIncomeStatement } from "../../api"
import Table from "../Table/Table"
import Spinner from "../Spinner/Spinner"
import { OutletContextType } from "../../Types/outlet"
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting"

interface Props {}

const configs = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.revenue),
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.costOfRevenue),
  },
  {
    label: "Depreciation",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.depreciationAndAmortization),
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.operatingIncome),
  },
  {
    label: "Income Before Taxes",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.incomeBeforeTax),
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.netIncome),
  },
  {
    label: "Earnings Per Share",
    render: (company: CompanyIncomeStatement) => formatRatio(company.eps),
  },
  {
    label: "Earnings Per Diluted",
    render: (company: CompanyIncomeStatement) =>
      formatRatio(company.epsDiluted),
  },
]

const IncomeStatements = (props: Props) => {
  const { ticker } = useOutletContext<OutletContextType>()
  const [incomeStatement, setIncomeStatement] =
    useState<CompanyIncomeStatement[]>()

  useEffect(() => {
    const incomeStatementFetch = async () => {
      const result = await getIncomeStatement(ticker)
      setIncomeStatement(result!.data)
    }
    incomeStatementFetch()
  }, [])

  return (
    <>
      {incomeStatement ? (
        <>
          <Table config={configs} data={incomeStatement} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default IncomeStatements
