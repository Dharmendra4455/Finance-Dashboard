import { useContext, useEffect } from "react"
import { dataapi } from "./Dashboard"


const Card = () => {
const{data ,setdata} =useContext(dataapi)

  return (
    // Card_Body  
      <div className="container flex-col flex sm:flex-row sm:justify-between sm:gap-1 gap-4 md:gap-4  py-2">
            {/* Static Card Data */}
         
          <div className='px-12 sm:px-3 md:px-8 lg:px-18 py-5 flex items-center gap-3 shrink-0 rounded-md text-xl text-zinc-50' style={{ backgroundColor: 'blue' }}>
        
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet-icon lucide-wallet"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>  
            <div className="wrapper">
              <div className="text">Total Balance</div>
              <div className="Value font-bold">{`$ ${data?.summary?.totalBalance||0}`}</div>
            </div>
         </div>

          <div className='px-12 sm:px-3 md:px-8 lg:px-18 py-5 flex items-center gap-3 shrink-0 rounded-md text-xl text-zinc-50' style={{ backgroundColor: 'green' }}>
             <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-dollar-sign-icon lucide-badge-dollar-sign"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
             <div className="wrapper">
              <div className="text">Monthly Income</div>
              <div className="Value font-bold">{`$ ${data?.summary?.monthlyIncome||0}`}</div>
             </div>
          </div>

          <div className='px-12 shrink-0 sm:px-3 md:px-6 lg:px-18 py-5  flex items-center gap-3  rounded-md text-xl text-zinc-50' style={{ backgroundColor: 'red' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-banknote-arrow-down-icon lucide-banknote-arrow-down"><path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><path d="m16 19 3 3 3-3"/><path d="M18 12h.01"/><path d="M19 16v6"/><path d="M6 12h.01"/><circle cx="12" cy="12" r="2"/></svg>
              <div className="wrapper">
              <div className="text">Monthly Expenses</div>
              <div className="Value font-bold">{`$ ${data?.summary?.monthlyExpenses||0}`}</div>
              </div>
          </div>





      </div>
  )
}

export default Card