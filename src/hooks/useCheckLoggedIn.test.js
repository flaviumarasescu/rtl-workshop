import {renderHook} from "@testing-library/react";
import useCheckLoggedIn from "./useCheckLoggedIn";
import {setLocalStorage} from "../../test-util/local-storage";

describe('useCheckLoggedIn', () => {
    it('returns false when the user is not logged in', () => {
        const { result } = renderHook(()=>useCheckLoggedIn())

        expect(result.current).toBe(false)
    })

    it('returns true when the user is logged in', () => {
        setLocalStorage('userEmail', true)
        const { result } = renderHook(()=>useCheckLoggedIn())

        expect(result.current).toBe(true)
    })
})