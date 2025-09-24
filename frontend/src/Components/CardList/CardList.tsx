import React, { SyntheticEvent } from "react"
import Card from "../Card/Card"
import { JSX } from "react/jsx-runtime"
import { CompanySearch } from "../../Types/company"
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
        <p className='mb-3 mt-3 text-xl font-semibold text-center md:text-xl'>
          No results!
        </p>
      )}
    </div>
  )
}

export default CardList
