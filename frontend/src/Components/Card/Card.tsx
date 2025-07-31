import React from "react"
import "./Card.css"
import { JSX } from "react/jsx-runtime"
import { CompanySearch } from "../../company"

interface Props {
  id: string
  searchResult: CompanySearch
}

const Card: React.FC<Props> = ({ id, searchResult }: Props): JSX.Element => {
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
    </div>
  )
}

export default Card
