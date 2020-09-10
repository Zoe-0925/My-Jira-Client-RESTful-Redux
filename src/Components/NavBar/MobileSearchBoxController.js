import React, { useState, useEffect } from 'react'
import MobileSearchBox from "./MobileSearchBox"

export default function SearchBoxController() {
    const [clicked, setClicked] = useState(false)

    return (
        <MobileSearchBox clicked={clicked} handleClick={() => setClicked(true)}
            handleClickAway={() => setClicked(false)} />
    )
}
