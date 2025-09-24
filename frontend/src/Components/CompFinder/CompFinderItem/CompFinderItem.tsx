import { Link } from "react-router-dom"

interface Props {
  ticker: string
}

const CompFinderItem = ({ ticker }: Props) => {
  return (
    // When this prop is true, clicking the link will perform a full page reload instead of using react router's client-side navigation. Useful for resetting app state, navigating routes not managed by react router, or forcing a fresh reload from server.
    <Link
      reloadDocument
      to={`/company/${ticker}/company-profile`}
      type='button'
      className='
    inline-flex items-center px-4 py-2
    text-sm font-medium text-gray-800
    bg-white border border-gray-300
    rounded-lg shadow-sm
    hover:bg-gray-50 hover:text-lightGreen
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
    transition-colors duration-150
  '
    >
      {ticker}
    </Link>
  )
}

export default CompFinderItem
