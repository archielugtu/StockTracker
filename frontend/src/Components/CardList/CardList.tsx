import React, { SyntheticEvent } from "react"
import Card from "../Card/Card"
import { JSX } from "react/jsx-runtime"
import { CompanySearch } from "../../company"
import { v4 as uuidv4 } from "uuid"

interface Props {
  searchResults: CompanySearch[]
  onPortfolioCreate: (e: SyntheticEvent) => void
}

const CardList: React.FC<Props> = ({
  searchResults,
  onPortfolioCreate,
}): JSX.Element => {
  return (
    <div>
      {searchResults.length > 1 ? (
        searchResults.map(r => (
          <Card
            key={uuidv4()}
            id={r.symbol}
            searchResult={r}
            onPortfolioCreate={onPortfolioCreate}
          />
        ))
      ) : (
        <h1>No results</h1>
      )}
    </div>
  )
}

export default CardList
