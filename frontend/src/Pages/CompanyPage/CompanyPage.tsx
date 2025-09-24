import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { CompanyProfile } from "../../Types/company"
import { getCompanyProfile } from "../../api"
import SideBar from "../../Components/Sidebar/Sidebar"
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard"
import Tile from "../../Components/Tile/Tile"
import Spinner from "../../Components/Spinner/Spinner"
import CompFinder from "../../Components/CompFinder/CompFinder"

interface Props {}

const CompanyPage = (props: Props) => {
  const { ticker } = useParams() //retrieves the ticker param from the URL
  const [company, setCompany] = useState<CompanyProfile>()

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker!)
      setCompany(result?.data[0])
    }
    getProfileInit()
  }, [])

  return (
    <>
      {company ? (
        <div className='w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden'>
          <SideBar />
          <CompanyDashboard
            ticker={ticker!}
            companyDescription={company.description}
          >
            <Tile title='Company Name' subTitle={company.companyName} />
            <Tile title='Price' subTitle={company.price.toString()} />
            <Tile title='Sector' subTitle={company.sector} />
            <Tile title='Market Cap' subTitle={company.marketCap.toString()} />
            <CompFinder ticker={company.symbol} />
          </CompanyDashboard>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default CompanyPage
