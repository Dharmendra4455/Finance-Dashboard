import Area_Chart from './Charts/Area_Chart'
import PieChartWithCustomizedLabel from './Charts/PieChartWithCustomizedLabel'

const BalanceTrend = () => {
  return (
    <>
      <div className="body flex flex-col sm:flex-row bg-zinc-50  rounded p-2 overflow-x-hidden">
        <div className="leftPortionGraph w-full sm:w-2/3  border-b sm:border-r sm:border-b-0 sm:pr-2">
          <h2 className='font-bold text-xl text-zinc-500'>Balance Trend <span className='text-zinc-500 text-lg'>(Last 6 months)</span></h2>
          <Area_Chart />
        </div>
        <div className="rightPortionPieChart w-full sm:w-1/3 sm:pl-2  ">
          <h2 className='font-semibold'>Spending Breakdown </h2>
          <PieChartWithCustomizedLabel />
        </div>
      </div>
   
    </>
  )
}

export default BalanceTrend