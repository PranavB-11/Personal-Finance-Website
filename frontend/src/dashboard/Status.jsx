import './Status.css'
import DashEntry from './DashEntry'

function Status({ SectionList }) {
    // console.log(SectionList)
    return (
        <div id="status-outer-container">
            <div id="status-container">
                <div id="status-inner-container">
                    <h1>Dashboard</h1>
                    <p id="status-add-section">Add Section</p>
                    {SectionList.map((section, index) => (
                        <DashEntry name={section.name} key={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Status