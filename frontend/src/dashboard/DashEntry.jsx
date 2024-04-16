import './DashEntry.css'

// Icons
import { MdDelete } from "react-icons/md"
import { CiSettings } from "react-icons/ci"
import { IoIosAddCircleOutline, IoMdOpen } from "react-icons/io"

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function DashEntry({ name }) {
    // Budget color
    const budget_class = "dash-entry-budget-low"
    const outerDivClassName = `dash-entry ${budget_class}`

    // Delete section
    const section_delete = async () => {
        const cookieUsername = getCookie('username')
        const cookiePassword = getCookie('password')

        console.log(cookiePassword, cookieUsername)

        // Delete section
        const response = await fetch('http://localhost:3000/section', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                'username': cookieUsername, 
                'password': cookiePassword,
                'section': name,
            })
        })
        const responseData = await response.json()

        if (responseData.success) {
            location.reload()
        }
    }

    return (
        <div className={outerDivClassName}>
            <div className="dash-entry-header">
                <h2>{name}</h2>
                <div className="dash-entry-options">
                    <button className="dash-entry-icon-button">
                        <IoIosAddCircleOutline size={30} />
                    </button>
                    <button className="dash-entry-icon-button">
                        <CiSettings size={30} />
                    </button>
                    <button onClick={section_delete} className="dash-entry-icon-button">
                        <MdDelete size={30} />
                    </button>
                    <button className="dash-entry-icon-button">
                        <IoMdOpen size={30} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DashEntry