import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useContext } from 'react';
import { dataapi } from '../Dashboard';
const months =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const Area_Chart = () => {
  const {data}= useContext(dataapi)
   
  //get sum of transaction by month
  const allTransaction =data?.transactions.reduce((acc, item)=>{
   const month= new Date(item?.date).getMonth()+1
   if(!acc[month])
    acc[month]=0;
  acc[month] =acc[month] +Math.abs(item?.amount)
  return acc
  },{})

  // convert into array
  const allTransactionArray =Object.keys(allTransaction).map((key)=>({
    month:months[key-1],
    balance :allTransaction[key]
  }))

// console.log(allTransactionArray)
  const mapdata =allTransactionArray.map((item)=>({name:item?.month,Balance:item?.balance}))
  return (
    <AreaChart
    
      style={{ width: '100%', maxHeight: '50vh', aspectRatio: 1.618 }}
      responsive
      data={mapdata}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 0,
      }}
      
      onContextMenu={(_, e) => e.preventDefault()}
    >

    <defs>
    <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="skyblue" stopOpacity={1} />
      <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.2} />
    </linearGradient>
    </defs>

      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" niceTicks="snap125" />
      <YAxis width="auto" niceTicks="snap125" />
      <Tooltip />
      <Area type="linear" dataKey="Balance" stroke="blue" dot={true} fill="url(#gradientColor)"  />
      <RechartsDevtools />
    </AreaChart>
  );
};

export default Area_Chart;