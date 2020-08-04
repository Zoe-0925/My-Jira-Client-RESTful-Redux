import React, { useState, useEffect } from 'react'
import SearchBox from "./SearchBox"

export default function SearchBoxController() {
    const [clicked, setClicked] = useState(false)

    return (
        <SearchBox clicked={clicked} handleClick={() => setClicked(true)}
            handleClickAway={() => setClicked(false)} />
    )
}
