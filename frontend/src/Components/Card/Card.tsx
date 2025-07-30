import React from "react"
import "./Card.css"
import { JSX } from "react/jsx-runtime"

interface Props {
  companyName: string
  ticker: string
  price: number
}

const Card: React.FC<Props> = ({
  companyName,
  ticker,
  price,
}: Props): JSX.Element => {
  return (
    <div className='card'>
      <img
        src='https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?semt=ais_hybrid&w=740'
        alt='Image'
      />
      <div className='details'>
        <h2>
          {companyName} ({ticker})
        </h2>
        <p>${price}</p>
      </div>
      <p className='info'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, ad?
      </p>
    </div>
  )
}

export default Card
