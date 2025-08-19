import React, { ChangeEvent, SyntheticEvent } from "react"
import { JSX } from "react/jsx-runtime"

interface Props {
  search: string | undefined
  onSearchSubmit: (e: SyntheticEvent) => void
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Search: React.FC<Props> = ({
  search,
  onSearchSubmit,
  handleSearchChange,
}: Props): JSX.Element => {
  return (
    <>
      <form onSubmit={onSearchSubmit}>
        <input value={search} onChange={handleSearchChange}></input>
      </form>
    </>
  )
}

export default Search
