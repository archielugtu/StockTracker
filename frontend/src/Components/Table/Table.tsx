import React from "react"
import { testIncomeStatementData } from "./testData"
import { v4 as uuidv4 } from "uuid"

const data = testIncomeStatementData

interface Props {}

type Company = (typeof data)[0]
const configs = [
  {
    label: "Year",
    render: (company: Company) => company.acceptedDate,
  },
  {
    label: "Cost of Revenue",
    render: (company: Company) => company.costOfRevenue,
  },
]

const Table = (props: Props) => {
  const renderedRows = data.map(company => {
    return (
      <tr key={uuidv4()}>
        {configs.map(val => {
          return (
            <td
              key={uuidv4()}
              className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'
            >
              {val.render(company)}
            </td>
          )
        })}
      </tr>
    )
  })
  const renderedHeaders = (
    <tr>
      {configs.map(config => {
        return (
          <th
            key={config.label}
            className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
          >
            {config.label}
          </th>
        )
      })}
    </tr>
  )
  return (
    <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
      <table>
        <thead className='min-d-full divide-y divide=gray-200 m-5'>
          {renderedHeaders}
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  )
}

export default Table
