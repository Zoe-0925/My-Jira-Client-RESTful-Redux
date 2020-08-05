import React from 'react'
import CustomSelect from "../Shared/CustomSelect"

export default function GroupBy() {
    const items = [{ name: "None", value: "" }, { name: "Assignee", value: "Assignee" }, { name: "Subtask", value: "Subtask" }]
    const handleFilter = (value) => {
        //TODO
        // change the board filter 

    }

    //TODO
    //Edit the Tooltip

    return (
        <CustomSelect className="group-by-filter" label="GROUP BY" items={items} onChange={handleFilter} />
    )
}
