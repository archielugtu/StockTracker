import { ClipLoader } from "react-spinners"
import "./Spinner.css"
interface Props {
  isLoading?: boolean
  size?: number
}

const Spinner = ({ isLoading = true, size = 35 }: Props) => {
  return (
    <>
      <div id='loading-spinner'>
        <ClipLoader
          color='#36d7b7'
          loading={isLoading}
          size={size}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      </div>
    </>
  )
}

export default Spinner
