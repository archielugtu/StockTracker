import React, { ChangeEvent, SyntheticEvent, use, useState } from "react"
import "./App.css"
import CardList from "./Components/CardList/CardList"
import Search from "./Components/Search/Search"
import { CompanySearch } from "./company"
import { searchCompanies } from "./api"
import ListPortfolio from "./Components/Portfolio/ListPortoflio/ListPortfolio"

function App() {
  const [search, setSearch] = useState("")
  const [portfolioValues, setPortfolioValues] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([])
  const [serverError, setServerError] = useState<string>("")

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const result = await searchCompanies(search)
    if (typeof result === "string") {
      setServerError(result)
    } else if (Array.isArray(result.data)) {
      setSearchResults(result.data)
    }
  }

  const onPortfolioCreate = (e: any) => {
    e.preventDefault()
    const newValue = e.target[0].value
    if (portfolioValues.find(p => p === newValue)) return
    const updatedPortfolio = [...portfolioValues, newValue]
    setPortfolioValues(updatedPortfolio)
  }

  return (
    <div className='App'>
      <Search
        search={search}
        handleSearchChange={handleSearchChange}
        onSearchSubmit={onSearchSubmit}
      />
      <ListPortfolio portfolioValues={portfolioValues} />
      {serverError && <h1>{serverError}</h1>}
      <CardList
        searchResults={searchResults}
        onPortfolioCreate={onPortfolioCreate}
      />
    </div>
  )
}

export default App
