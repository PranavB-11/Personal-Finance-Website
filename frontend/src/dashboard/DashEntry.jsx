import './DashEntry.css'

import { MdDelete } from "react-icons/md"
import { CiSettings } from "react-icons/ci"
import { IoIosAddCircleOutline, IoMdOpen } from "react-icons/io"
// import { IoMdOpen } from "react-icons/io";

// import { FaFolderOpen } from "react-icons/fa";

function DashEntry({name, budget}) {
    const budget_class = {
        "low": "dash-entry-budget-low",
        "medium": "dash-entry-budget-medium",
        "high": "dash-entry-budget-high",
    }
    return (
        <div id="dash-entry" class={budget_class[budget]}>
            <h2>{name}</h2>
            <div id="dash-entry-options">
                <IoIosAddCircleOutline size={30}/>
                <CiSettings size={30}/>
                <MdDelete size={30}/>
                <IoMdOpen size={30}/>
            </div>
        </div>
    )
}

export default DashEntry