import React, { useContext, useEffect, useState } from 'react'
import { dataapi } from '../Dashboard'
import { toast } from 'react-toastify'
const Categories =["Food","Shopping","Transport","Bills","Income"]

const Add_Edit_Transaction = (props) => {
   
  const {data,setdata} =useContext(dataapi)
  const[editdata ,seteditdata] =useState({})
  const[formdata ,setformdata] =useState({
    id:props.transactiondata?.dataid? props.transactiondata?.dataid: `txn${data.transactions.length+1}`,
    date:`${new Date().toLocaleDateString('en-CA')} `,
    category:'',
    type:'',
    description:'',
    amount:''
   })
   
   useEffect(()=>{
   
    if(props?.transactiondata?.dataid){
      const editdata =data?.transactions?.filter((item)=>item?.id==props.transactiondata.dataid)
      // console.log(props.transactionId ,editdata)
      setformdata(editdata[0])
    }
   
   },[props])
  //  console.log(formdata)
   const dateFormate=(date)=>{
   const newdate = new Date(date).toDateString().split(' ')
   return (`${newdate[1]} ${newdate[2]} ${newdate[3]}`)
}
// console.log(formdata)
const Submithandler=()=>{
  if(!formdata.category) return toast.error("Select Category!")
  if(!formdata.type) return toast.error("Select type!")
  if(!formdata.amount) return toast.error("Enter amount!")
  if(!formdata.description) return toast.error("Enter description!")
  
    if(props.transactiondata?.dataid){  //edit mode (admin)
     setdata((prev)=>({
      ...prev,
     transactions: prev.transactions.map((item) =>
      item.id === formdata.id
        ? { ...item, ...formdata }   // replace with updated data
        : item
      )
    
    }))
    toast.success('Transaction Updated Successfully')
   }
   else{

     setdata((prev)=>({       //add mode
       ...prev,
       transactions:[...prev.transactions ,formdata]
     }))
     toast.success('Transaction added Successfully')
    }
    props.setclose()
}

  return (
    <main className='z-10 fixed insert-0 top-0 left-0 flex justify-center items-center  bg-black/60 w-full overflow-x-hidden h-full'>
      <div className=" w-80  bg-zinc-50 p-2">
       <nav className='flex justify-between px-4'>
        <h1></h1>
        <h1 className='text-xl font-bold text-zinc-700'>{props?.transactiondata?.mode=='edit' ?'Edit Transaction': 'Add Transaction' }</h1>
        <div 
        onClick={()=>props.setclose()}
        className="cross hover:cursor-pointer hover:bg-zinc-400 text-red-600 bg-zinc-300 w-7 rounded-full text-center">✘</div>
       </nav>
    {/* Field Data */}
        <div className='px-4  text-zinc-800 font-semibold flex flex-col'>

          <label className='mt-4'>Date : </label>
          <input
            type="text"
            defaultValue={dateFormate(formdata.date)}
            className=' outline-0 border-2 border-zinc-400 p-1 rounded bg-zinc-100 pointer-events-none'
          />

          <label className='mt-2'> Category: </label>
          <select
            onChange={(e) => setformdata((prev) =>
            ({
              ...prev,
              category: e.target.value
            })
            )}
            value={formdata?.category}
            className=' outline-0 border-2 border-zinc-400 p-1 rounded' >

            <option value="">Selet Category</option>
            {Categories?.map((item, index) => {
              return (
                <option key={index} value={item}>{item}</option>
              )
            }
            )}
          </select>


          <label className='mt-2'>Type : </label>
          <select
            value={formdata?.type}
            onChange={(e) => setformdata((prev) =>
            ({
              ...prev,
              type: e.target.value
            })
            )}
            className=' outline-0 border-2 border-zinc-400 p-1 rounded'
          >
            <option value="">Select Type</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

         
          <label className='mt-2'>Amount($) : </label>
          <input
            type='text'
            onChange={(e) => {
              const value = e.target.value
              if (value >= 0)
                setformdata((prev) => ({
                  ...prev,
                  amount: value
                })
                )
            }}
            value={formdata?.amount}
            className=' outline-0 border-2 border-zinc-400 p-1 rounded' 
            />

          <label className='mt-2'>Description : </label>
          <textarea
            value={formdata?.description}
            onChange={(e) =>
              setformdata((prev) => ({
                ...prev,
                description: e.target.value
              })
              )}
            className='outline-0 border-2 border-zinc-400 p-1 rounded min-h-12 max-h-20'>
          </textarea>
          
          {/* Buttons */}
          <div className="wrapper flex flex-col sm:flex-row sm:gap-4 gap-0 justify-center" >
            <button
              onClick={Submithandler}
              className='bg-sky-600 mt-4 py-2 text-zinc-50 hover:cursor-pointer px-10 hover:bg-sky-700 rounded'
            >
              {props.transactionId ? 'Update' : 'Save'}
            </button>
            <button
              className=' mt-4 py-2 text-zinc-950 hover:cursor-pointer px-8  rounded border bg-white hover:bg-zinc-100'
              onClick={() => props.setclose()}
            >
              Cancle
              </button>
          </div>

        </div>

     </div>
    </main>
  )
}

export default Add_Edit_Transaction 