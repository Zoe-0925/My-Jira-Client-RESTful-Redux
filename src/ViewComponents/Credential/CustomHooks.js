import { useState } from "react"
import { manualSignup, manualLogin } from "../../Components/User//Actions"

export function useSignup() {
    const [message, setMessage] = useState("")

    const handleManualSignup = ({ email, password, nextPathname }) =>
        manualSignup({ email, password, nextPathname }).then((loginMessage) => {
            if (loginMessage) {
                // report to the user is there was a problem during login
                setMessage({
                    loginMessage
                })
            }
        })

    return { handleManualSignup, message }
}

export function useLogin() {
    const [message, setMessage] = useState("")

    const handleManualLogin = ({ email, password, nextPathname }) =>
        manualLogin({ email, password, nextPathname }).then((loginMessage) => {
            if (loginMessage) {
                // report to the user is there was a problem during login
                setMessage({
                    loginMessage
                })
            }
        })

    return { handleManualLogin, message }
}
