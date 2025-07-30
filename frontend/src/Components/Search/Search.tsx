import React, { ChangeEvent, SyntheticEvent } from "react"
import { JSX } from "react/jsx-runtime"

interface Props {
  search: string | undefined
  onClick: (e: SyntheticEvent) => void
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Search: React.FC<Props> = ({
  search,
  onClick,
  handleChange,
}: Props): JSX.Element => {
  return (
    <div>
      <input value={search} onChange={e => handleChange(e)}></input>
      <button onClick={e => onClick(e)}>Search</button>
    </div>
  )
}

export default Search
