import { useContext } from "react";
import { dataapi} from './Dashboard'
const months =['January','Febuary','March','April','May','June','July','August','September','October','November','December']
const Insight = () => {
  const {data}=useContext(dataapi)
  const spenddata= data?.transactions.reduce((initial ,item)=>{
  const category =item?.category
  if(!initial[category]){
    initial[category]=0;
  }
  initial[category] += Math.abs(item?.amount)
return initial
},{});

// convert into array formate
const spenddataarray =Object.keys(spenddata).map((key)=>({
  category:key,
  amount:spenddata[key]
}))
 const spendings= spenddataarray?.filter((item)=>item.category!=='Income').map((item)=>({name:item.category,value:item.amount}))
 
 const totalspendings=spendings.reduce((acc,item)=>{
  return acc+item?.value
},0)




// console.log(totalspendings ,spenddataarray[0].amount)
 

 //get sum of expenses by month
  const allTransaction =data?.transactions.reduce((acc, item)=>{
   const month= new Date(item?.date).getMonth()+1
   if(!acc[month])
    acc[month]=0;
  if(item?.type!='income')
  acc[month] =acc[month] +Math.abs(item?.amount)
  return acc
  },{})

  // convert into array
  const allTransactionArray =Object.keys(allTransaction).map((key)=>({
    month:key,
    balance :allTransaction[key]

  }))

  
  // const current_month =new Date().getMonth()+1 ---- for real data

  //due to dummy data  -- current month =june 
  const lastindex = allTransactionArray.length-1
  const current_month_expenses=allTransactionArray[lastindex]
  const prevmonth_expenses =allTransactionArray[lastindex-1]

  // For High expense category 

const currentMonthExpense = data.transactions.filter((item)=>
  new Date(item.date).getMonth()+1 ==current_month_expenses.month    //current date
  && item.type !='income'                                            // remove income select only expense
)
const highExpense = currentMonthExpense.reduce((acc,item)=> {
  return acc.amount>item.amount ?  acc : item
    
},0);

 return (
    
    
    <main className='bg-zinc-50 p-2 w-full  lg:w-60 rounded shrink-0 text-zinc-700 font-bold '>
    <h2 className='border-b-2 py-2 text-xl border-zinc-300'>Insights</h2>
    
    {/* Highest Spending */}
    <div className="wrapper border-b-2 py-2 border-zinc-300">
    <h2>Highest Spending : </h2>
    <h4 className='text-sm'>{`${highExpense?.category} $${highExpense?.amount } `}<span className='font-semibold'> this month</span></h4>
    </div>
   
    {/* Monthly Comarision */}
    <div className="wrapper border-b-2 py-2 border-zinc-300">
    <h2>Monthly Comparision: </h2>
  {  current_month_expenses?.balance > prevmonth_expenses?
     <h4 className='text-sm'>{`${months[current_month_expenses?.month-1]} expanses  are ${(((current_month_expenses?.balance - prevmonth_expenses?.balance)/current_month_expenses?.balance)*100).toFixed(2)}% higher than ${months[prevmonth_expenses?.month-1]}`}</h4>
     :
     <h4 className='text-sm'>{`${months[current_month_expenses?.month-1]} expanses  are ${(((prevmonth_expenses?.balance-current_month_expenses?.balance)/current_month_expenses?.balance)*100).toFixed(2)}% lower than ${months[prevmonth_expenses?.month-1]}`}</h4>
  
  }
    </div>
    {/* Tip */}
    <div className="wrapper border-b-2 py-2 border-zinc-300">
    <h2>Tip : </h2>
    {totalspendings < spenddataarray[0]?.amount 
       ?
      <h4 className='text-sm'>Your income <span className='font-semibold'>is highest than your expenses. <span style={{color:'green'}}>Great job!</span> </span></h4>
      :
      <h4 className='text-sm'>Your expenses <span className='font-semibold'>is highest than your income. <span style={{color:'red'}}>Improve It!</span></span></h4>

    }
    </div>
    </main>
    
  )
}

export default Insight