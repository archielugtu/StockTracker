import React from 'react'
import Card from '../Card/Card'

interface Props {

}

const CardList = (props: Props) => {
  return (
    <div>
      <Card companyName='Apple' ticker="AAPL" price={110}/>
      <Card companyName='Tesla' ticker="TSLA" price={10}/>
      <Card companyName='Google' ticker="GOOG" price={20}/>
    </div>
  )
}

export default CardList