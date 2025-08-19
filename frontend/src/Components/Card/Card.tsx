import React, { SyntheticEvent } from "react"
import "./Card.css"
import { JSX } from "react/jsx-runtime"
import { CompanySearch } from "../../company"
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio"

interface Props {
  id: string
  searchResult: CompanySearch
  onPortfolioCreate: (e: SyntheticEvent) => void
}

const Card: React.FC<Props> = ({
  id,
  searchResult,
  onPortfolioCreate,
}: Props): JSX.Element => {
  return (
    <div className='card'>
      <img
        src='https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?semt=ais_hybrid&w=740'
        alt='company logo'
      />
      <div className='details'>
        <h2>
          {searchResult.name} ({id})
        </h2>
        <p>{searchResult.currency}</p>
      </div>
      <p className='info'>{searchResult.exchangeFullName}</p>
      <AddPortfolio
        onPortfolioCreate={onPortfolioCreate}
        symbol={searchResult.symbol}
      />
    </div>
  )
}

export default Card
