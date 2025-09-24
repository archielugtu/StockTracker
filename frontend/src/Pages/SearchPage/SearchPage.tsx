import React, { ChangeEvent, SyntheticEvent, useState } from "react"
import { CompanySearch } from "../../Types/company"
import { searchCompanies } from "../../api"
import Search from "../../Components/Search/Search"
import ListPortfolio from "../../Components/Portfolio/ListPortoflio/ListPortfolio"
import CardList from "../../Components/CardList/CardList"

interface Props {}

const SearchPage = (props: Props) => {
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

  const onPortfolioDelete = (e: any) => {
    e.preventDefault()
    const newPortfolioValues = portfolioValues.filter(
      p => p !== e.target[0].value
    )
    setPortfolioValues(newPortfolioValues)
  }

  return (
    <div className='App'>
      <Search
        search={search}
        handleSearchChange={handleSearchChange}
        onSearchSubmit={onSearchSubmit}
      />
      <ListPortfolio
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />
      {serverError && <h1>{serverError}</h1>}
      <CardList
        searchResults={searchResults}
        onPortfolioCreate={onPortfolioCreate}
      />
    </div>
  )
}

export default SearchPage
