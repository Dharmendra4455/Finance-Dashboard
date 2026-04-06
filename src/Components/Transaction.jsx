import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { dataapi } from './Dashboard'
import Add_Edit_Transaction from "./Form/Add_Edit_Transaction"
import { toast } from "react-toastify"
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const Categories = ["Food", "Shopping", "Transport", "Bills", "Income"]
const Transaction = () => {
  const { data, setdata } = useContext(dataapi)
  const [searchdata, setsearchdata] = useState('')
  const [datedata, setdatedata] = useState('')
  const [categorydata, setcategorydata] = useState('')
  const [Filterdata, setfilterdata] = useState(data?.transactions)
  const [showForm, setshowform] = useState(false)
  const [showwarning, setshowwarning] = useState(false)
  const Addeditdata = useRef({
    mode: '',
    dataid: ''
  })


  const dateFormate = (date) => {
    const newdate = new Date(date).toDateString().split(' ')
    return (`${newdate[1]} ${newdate[2]} ${newdate[3]}`)
  }

  // debounce mechanism for Search 
  useEffect(() => {

    const event = setTimeout(() => {
      // By search input
      const newdata = data?.transactions?.filter((item) => {  //search within original data and return  newdata if found
        const Inputsearch =
          !searchdata ||               //if no search input it make return condition true.
          item.description
            ?.toLowerCase()
            .includes(searchdata.toLowerCase())

        const categorysearch = !categorydata || item.category === categorydata
        // console.log(datedata,new Date(item.date).getMonth()+1)
        const datesearch = !datedata || new Date(item.date).getMonth() + 1 === Number(datedata)

        return Inputsearch && categorysearch && datesearch  //check condition if all true then return  
      })
      setfilterdata(newdata)   //set result array

    }, 500);
    return () => clearTimeout(event)

  }, [searchdata, categorydata, datedata, data.transactions])



  const deletehandler = () => {
    setdata((prev) => ({
      ...prev,
      transactions: data?.transactions?.filter((item) => item?.id !==Addeditdata.current?.dataid)   //set all data to transaction array except selected one
    }))
    toast.success('Transaction deleted Successfully')
    setshowwarning(false)

  }
  return (
    <>
      <main className={`${showForm || showwarning ? "fixed" : "static"} body mt-2 bg-zinc-50  rounded p-2  w-full overflow-x-hidden `}>

        {/* Search_Filter_Section */}
        <h1 className='font-bold text-xl text-zinc-500 my-2'>Recent Transaction</h1>
        <nav className='flex flex-col border-b-2  shadow-zinc-200 shadow-xs py-2 border-zinc-300 md:flex-row justify-around items-center gap-2 md:gap-4 px-1 '>

          <div className="leftSide_filter_Searhbox flex  md:flex-row gap-2 w-full md:w-fit flex-col-reverse">
 
          {/* Category */}
            
            <select
              onChange={(e) => setcategorydata(e.target.value)}
              name="Categoty_filter"
              className='outline-0 border-2 border-zinc-300 rounded px-1 py-1 '
            >
              <option value="">All Categories</option>
              {Categories?.map((item, index) => {
                return (

                  <option key={index} value={item}>{item}</option>
                )
              })
              })
            </select>

            {/* Input Search */}

            <div className="wrapper px-1 md:w-[25vw] lg:w-[22vw]  border-2 border-zinc-300 rounded flex items-center overflow-x-hidden">
              <svg className='text-zinc-400' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>
              <input
                value={searchdata}
                onChange={(e) => setsearchdata(e.target.value)}
                className='py-1 pl-2 w-full   outline-0 '
                type="text"
                placeholder='search..'
              />
            </div>
          </div>

          
          <div className="rightend_filter_Add_Tr  flex flex-col shrink-0 md:flex-row gap-2 w-full md:w-fit">
            
            {/* Months */}
           
            <span className='shrink-0 '>
              <select
                onChange={(e) => setdatedata(e.target.value)}
                name="Date"
                className='outline-0 border-2 border-zinc-300 px-2 py-1 rounded w-full  md:w-[12vw] '
              >
                <option value="">Month</option>
                {months?.map((item, index) => {
                  return (
                    <option key={index} className="px-2" value={index + 1}>{item}</option>
                  )
                })}
              </select>
            </span>
           
           {/* Add Transaction Button */}
            <button
              className={`bg-sky-600 text-zinc-50 px-2 md:px-4 py-1 rounded shrink-0 ${data?.user?.role == 'admin' ?'block' :'hidden'}`}
              onClick={() => {
                Addeditdata.current.mode='add'
                setshowform(true)
                document.body.style.position='fixed'
              }}
            >Add Transaction
            </button>

          </div>

        </nav>

        {/* Table Section */}
        <div className="Tablebody py-1 h-80 overflow-auto">
          <table className='table-auto w-full min-w-max  '>
            <thead className='font-bold bg-zinc-300 '>
              <tr className='border-b-2 border-zinc-400 text-zinc-800'>
                <td className='p-2'>Date</td>
                <td className='p-2'>Description</td>
                <td className='p-2'>Category</td>
                <td className='p-2'>Amount</td>
                <td className='p-2'>Type</td>
                <td className='p-2'></td>
              </tr>
            </thead>
            <tbody>

              {Filterdata.length > 0 ?
                Filterdata?.map((item, index) => {
                  return (
                    <tr key={index} className='border-b-2 border-zinc-300 font-semibold text-zinc-800'>
                      <td className='p-2'>{dateFormate(item?.date)}</td>
                      <td className='p-2'>{item?.description}</td>
                      <td className='p-2'>{item?.category}</td>
                      <td className={`p-2 ${item?.type == "expense" ? "text-red-600" : "text-green-700"}`}>{item?.type === "expense" ? "-" + "$" + item?.amount : "+" + "$" + item?.amount}</td>
                      <td className='p-2'>{item?.type}</td>
                      {data?.user?.role == 'admin' &&
                        <td className='p-2 flex gap-2'>
                          <svg
                            onClick={() => {
                              Addeditdata.current = {
                                mode: 'edit',
                                dataid: item?.id
                              }
                              setshowform(true)
                              document.body.style.position='fixed'

                            }}
                            xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-950 font-bold hover:scale-110 lucide  hover:cursor-pointer lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>

                          <svg
                            onClick={() => {
                            Addeditdata.current = { dataid: item?.id }
                            setshowwarning(true)
                            document.body.style.position='fixed'  //make baground dashboard fixed when modal open
                            }}
                            xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 hover:scale-110 hover:cursor-pointer lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                        </td>}

                    </tr>
                  )
                }) :
                <tr>
                  <td className="text-2xl font-bold text-zinc-500 text-center">Data not Found!</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </main>

      {
        showForm && (
          <Add_Edit_Transaction
            transactiondata={Addeditdata.current.mode == 'edit'
               ? Addeditdata.current
              : null}
            setclose={() => {
              setshowform(false)
            document.body.style.position='static'   //release from fixied position
            }}
            
          />
        )
      }

      {
        showwarning && (
          <main className="top-0 left-0 flex w-full h-full fixed justify-center items-center px-2 bg-zinc-800/80">
            <div className="body bg-white w-fit p-2 rounded-lg">
              <h3 className="text-lg font-semibold text-zinc-700">Are you sure you want to delete this transaction?</h3>
              <div className="buttonWrapper float-end flex gap-2 mt-2 mr-4">
                <button
                  className="rounded hover:cursor-pointer px-4 text-zinc-50 bg-red-600"
                  onClick={() =>{
                     deletehandler()
                     document.body.style.position='static'

                  }}
                >
                  Yes
                </button>

                <button
                  className="rounded hover:cursor-pointer px-4 bg-zinc-200"
                  onClick={() => {
                    setshowwarning(false)
                    document.body.style.position='static'
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </main>
        )
      }
    </>
  )
}

export default Transaction