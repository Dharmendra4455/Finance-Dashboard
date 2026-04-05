import { Cell, Legend, Pie, PieChart, Sector, Tooltip } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useContext, useState } from 'react';
import {dataapi} from '../Dashboard'
const RADIAN = Math.PI / 180;
const COLORS = ['purple', 'orange', 'red', 'green'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (

    <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central"  className='text-[12px] font-semibold sm:text-[10px] md:text-[13px]' >
      {`${((percent ?? 1) * 100).toFixed(0)}%`} 
    </text>
  );
};

const MyCustomPie = (props) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

export default function PieChartWithCustomizedLabel({ isAnimationActive = true }) {
  const {data} =useContext(dataapi)

const categorydata = data?.transactions.reduce((initial ,item)=>{
  const category =item?.category
  if(!initial[category]){
    initial[category]=0;
  }
  initial[category] += Math.abs(item?.amount)
return initial
},{});

// convert into array formate
const categorydataarray =Object.keys(categorydata).map((key)=>({

  category:key,
  amount:categorydata[key]
}))
// console.log(categorydataarray)

 const mapdata= categorydataarray?.filter((item)=>item.category!=='Income').map((item)=>({name:item.category,value:item.amount}))
  return (
    <PieChart style={{ width: '100%', maxWidth: '400px',height:'100vw', maxHeight:'260px', aspectRatio: 1, }} responsive>
      <Pie
       legendType='circle'
        data={mapdata}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="red"
        dataKey="value"
        isAnimationActive={isAnimationActive}
        shape={MyCustomPie}
   
      >
         {mapdata.map((entry, index) => (
          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
        </Pie>
    <Legend
    
    layout="vertical"     // 👈 stack items vertically
    align="right"         // 👈 move to right side
    verticalAlign="middle" // 👈 center vertically
    wrapperStyle={{ fontSize: "14px"  }}
   />
      <RechartsDevtools />
      <Tooltip />
    </PieChart>
  );
}