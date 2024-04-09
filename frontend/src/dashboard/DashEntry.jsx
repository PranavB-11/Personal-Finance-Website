import './DashEntry.css'

import { MdDelete } from "react-icons/md"
import { CiSettings } from "react-icons/ci"
import { IoIosAddCircleOutline } from "react-icons/io"
import { FaBookOpen } from "react-icons/fa"

function DashEntry() {
    return (
        <div id="dash-entry">
            laksjdhflakjsdhflakjsdhflaksjdh
            <h2>Takeout Food</h2>
            <div id="dash-entry-options">
                <MdDelete />
                <CiSettings />
                <IoIosAddCircleOutline />
                <FaBookOpen />
            </div>
        </div>
    )
}

export default DashEntry