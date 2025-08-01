import React, { ChangeEvent, SyntheticEvent, use, useState } from "react"
import "./App.css"
import CardList from "./Components/CardList/CardList"
import Search from "./Components/Search/Search"
import { CompanySearch } from "./company"
import { searchCompanies } from "./api"

function App() {
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([])
  const [serverError, setServerError] = useState<string>("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onClick = async (e: SyntheticEvent) => {
    const result = await searchCompanies(search)
    if (typeof result === "string") {
      setServerError(result)
    } else if (Array.isArray(result.data)) {
      setSearchResults(result.data)
    }
  }

  return (
    <div className='App'>
      <Search search={search} handleChange={handleChange} onClick={onClick} />
      {serverError && <h1>{serverError}</h1>}
      <CardList searchResults={searchResults} />
    </div>
  )
}

export default App
