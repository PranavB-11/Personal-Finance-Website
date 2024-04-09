import './Status.css'

import DashEntry from './DashEntry'

function Status() {
    return (
        <div id="status-outer-container">
            <div id="status-container">
                <div id="status-inner-container">
                    <h1>Dashboard</h1>
                    <DashEntry />
                </div>
            </div>
        </div>
    )
}

export default Status
