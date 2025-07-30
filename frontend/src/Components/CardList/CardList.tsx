import React from "react"
import Card from "../Card/Card"
import { JSX } from "react/jsx-runtime"
import { CompanySearch } from "../../company"

interface Props {
  searchResult: CompanySearch[]
}

const CardList: React.FC<Props> = ({ searchResult }: Props): JSX.Element => {
  return (
    <div>
      {searchResult.map(r => (
        <Card companyName={r.name} ticker={r.symbol} price={99} />
      ))}
    </div>
  )
}

export default CardList
