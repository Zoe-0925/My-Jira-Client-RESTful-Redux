import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectLabels } from "../../Components/Selectors"
import { filterByLabel } from "../../Components/Filter/Actions"

export const useLabelFilter = (data) => {
    const labels = useSelector(state=> selectLabels(state))

    const dispatch = useDispatch()

    const dispatchFilterByLabel = useCallback(() => {
        filterByLabel(data)
    }, [dispatch])

    return { labels, dispatchFilterByLabel }
}