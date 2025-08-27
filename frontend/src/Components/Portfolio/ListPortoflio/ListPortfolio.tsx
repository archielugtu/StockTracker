import React from "react"
import CardPortfolio from "../CardPortfolio/CardPortfolio"

interface Props {
  portfolioValues: string[]
  onPortfolioDelete: (e: any) => void
}

const ListPortfolio = ({ portfolioValues, onPortfolioDelete }: Props) => {
  return (
    <>
      <h3>My Portfolio</h3>
      <ul>
        {portfolioValues &&
          portfolioValues.map(portfolioValue => {
            return (
              <CardPortfolio
                key={portfolioValue}
                portfolioValue={portfolioValue}
                onPortfolioDelete={onPortfolioDelete}
              />
            )
          })}
      </ul>
    </>
  )
}

export default ListPortfolio
