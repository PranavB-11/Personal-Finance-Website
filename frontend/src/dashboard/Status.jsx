import './Status.css'

import DashEntry from './DashEntry'

function Status() {
    return (
        <div id="status-outer-container">
            <div id="status-container">
                <div id="status-inner-container">
                    <h1>Dashboard</h1>
                    <DashEntry name={"Takeout Food"} budget={"low"}/>
                    <DashEntry name={"Clothes"} budget={"medium"}/>
                    <DashEntry name={"Grocery"} budget={"high"}/>
                    <DashEntry name={"Laundry"} budget={"low"}/>
                </div>
            </div>
        </div>
    )
}

export default Status
