import {appReducer, AppStatusErrorType, setError, setStatus} from "./app-reducer";

let startState: AppStatusErrorType

beforeEach(() => {
        startState = {
            status: "idle",
            error: null,
            isInitialized: false
        }
    }
)

test("errorMessage should be set", () => {
    const endState = appReducer(startState, setError({error:"some error"}))
    expect(endState.error).toBe("some error")
})
test("status should be set", () => {
    const endState = appReducer(startState, setStatus({status: "loading"}))
    expect(endState.status).toBe("loading")
})