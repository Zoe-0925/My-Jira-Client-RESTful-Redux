import React, { Fragment } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { TextField, ClickAwayListener } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useSimpleState } from './CustomHooks';

export default function SearchBox() {
    const { value, handleTrue, handleFalse } = useSimpleState()
    const placeholder = value ? "Search Jira" : "Search"
    const className = value ? "search-box clicked" : "search-box"

    return (
        <Fragment>
            <ClickAwayListener onClickAway={handleFalse}>
                <TextField className={className} id="standard-search" placeholder={placeholder} type="search"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    onClick={handleTrue}
                />
            </ClickAwayListener>
        </Fragment>
    )
}
