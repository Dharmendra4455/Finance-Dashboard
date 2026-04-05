import React from 'react'
import Navbar from './Navbar'
import Card from './Card'
import BalanceTrend from './BalanceTrend'
import AreaChart from './Charts/Area_Chart'
import Transaction from './Transaction'
import Insight from './Insight'
import { Children, createContext, useState } from 'react'
import Financedata from './../assets/FinanceData.json'
export const dataapi = createContext()

const Dashboard = () => {
  const [data, setdata] = useState(Financedata)
  return (
    <>
      <dataapi.Provider value={{ data, setdata }}>

        <Navbar />
        <div className='px-4 bg-zinc-200'>
          <Card />
          <div className="flex flex-col pb-4 items-center lg:flex-row gap-2 lg:items-stretch w-full overflow-x-hidden ">

            <div className="innerwrapper w-full">
              <BalanceTrend />
              <Transaction />
            </div>
            <div className="wrapper flex-1 w-full flex justify-center">

              <Insight />
            </div>
          </div>
        </div>

      </dataapi.Provider>
    </>

  )
}

export default Dashboard