import React from 'react'
import Card from '../Card/Card'
import { JSX } from 'react/jsx-runtime'

interface Props {

}

const CardList : React.FC<Props> = (props: Props) : JSX.Element => {
  return (
    <div>
      <Card companyName='Apple' ticker="AAPL" price={110}/>
      <Card companyName='Tesla' ticker="TSLA" price={10}/>
      <Card companyName='Google' ticker="GOOG" price={20}/>
    </div>
  )
}

export default CardList