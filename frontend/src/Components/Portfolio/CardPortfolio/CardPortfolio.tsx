import React, { JSX, SyntheticEvent } from "react"
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio"

interface Props {
  portfolioValue: string
  onPortfolioDelete: (e: SyntheticEvent) => void
}

const CartPortfolio: React.FC<Props> = ({
  portfolioValue,
  onPortfolioDelete,
}): JSX.Element => {
  return (
    <>
      <h4>{portfolioValue}</h4>
      <DeletePortfolio
        portfolioValue={portfolioValue}
        onPortfolioDelete={onPortfolioDelete}
      />
    </>
  )
}

export default CartPortfolio
