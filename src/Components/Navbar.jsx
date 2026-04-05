import { useContext } from "react"
import { dataapi } from "./Dashboard"

const Navbar = () => {
    const {data ,setdata} = useContext(dataapi)

    return (

        <div className="main flex justify-between text-zinc-700 px-2 border-b shadow-sm border-zinc-400 py-2 bg-zinc-100 overflow-x-hidden">
            <div className="leftText text-xl text-zinc-500 font-bold">Finance Dashboard</div>
            <div className="rightSection font-semibold text-sm flex gap-2">
                <div className="wrapper flex flex-col sm:flex-row gap-1 sm:gap-2 items-center">
                    <div className="name"> <span className=''>{`Welcome ${data?.user?.name}`}</span></div>
                    
                    <div className="role flex items-center gap-0.5 text-sm">
                        <h4 className="text-[16px]">Role: </h4>
                        <select
                            value={data?.user?.role}
                            onChange={(e) => setdata((prev) => ({
                                ...prev,
                                user: { ...prev.user, role: e.target.value }
                            }))}
                            className="outline-0 px-8 py-0.5 border rounded text-zinc-500 font-bold">
                            <option className="font-semibold" value="viewer ">Viewer</option>
                            <option className="font-semibold" value="admin">Admin</option>
                        </select>
                    </div>
                   
                </div>

                <div className="login_icon text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="lucide lucide-circle-user-icon lucide-circle-user"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" /></svg>
                </div>
            </div>
        </div>
  )
}

export default Navbar