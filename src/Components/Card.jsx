import { useContext, useEffect } from "react"
import { dataapi } from "./Dashboard"


const Card = () => {
const{data ,setdata} =useContext(dataapi)

  return (
    // Card_Body  
      <div className="container flex-col flex sm:flex-row sm:justify-between gap-4  py-2">
            {/* Static Card Data */}
          <div
              className='px-12 sm:px-6 md:px-12 lg:px-22 py-5  shrink-0 rounded-md text-xl text-zinc-50' style={{ backgroundColor: 'blue' }}>
              <div className="text">Total Balance</div>
              <div className="Value font-bold">{`$ ${data?.summary?.totalBalance||0}`}</div>
          </div>

          <div
              className='px-12 sm:px-6 md:px-12 lg:px-22 py-5  shrink-0 rounded-md text-xl text-zinc-50' style={{ backgroundColor: 'green' }}>
              <div className="text">Monthly Income</div>
              <div className="Value font-bold">{`$ ${data?.summary?.monthlyIncome||0}`}</div>
          </div>

          <div
              className='px-12 sm:px-6 md:px-12 lg:px-22 py-5  shrink-0 rounded-md text-xl text-zinc-50' style={{ backgroundColor: 'red' }}>
              <div className="text">Monthly Expenses</div>
              <div className="Value font-bold">{`$ ${data?.summary?.monthlyExpenses||0}`}</div>
          </div>





      </div>
  )
}

export default Card