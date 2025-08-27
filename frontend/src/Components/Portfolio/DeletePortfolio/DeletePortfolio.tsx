import React, { JSX, SyntheticEvent } from "react"

interface Props {
  portfolioValue: string
  onPortfolioDelete: (e: SyntheticEvent) => void
}

const DeletePortfolio: React.FC<Props> = ({
  portfolioValue,
  onPortfolioDelete,
}): JSX.Element => {
  return (
    <form onSubmit={onPortfolioDelete}>
      <input hidden={true} value={portfolioValue} />
      <button type='submit'>X</button>
    </form>
  )
}

export default DeletePortfolio
