import React, { JSX, SyntheticEvent } from "react"
import CardPortfolio from "../CardPortfolio/CardPortfolio"

interface Props {
  portfolioValues: string[]
  onPortfolioDelete: (e: SyntheticEvent) => void
}

const ListPortfolio: React.FC<Props> = ({
  portfolioValues,
  onPortfolioDelete,
}): JSX.Element => {
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
