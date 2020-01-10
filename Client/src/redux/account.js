//Actions
const ACCOUNT_SIGNIN = 'ACCOUNT_SIGNIN'
const ACCOUNT_SIGNOUT = 'ACCOUNT_SIGNOUT'

//Action Creators
const signIn = payload => ({ type: ACCOUNT_SIGNIN, payload })
const signOut = () => ({ type: ACCOUNT_SIGNOUT })

//Thunk
export const accountSignIn = (payload) => {
    return (dispatch) => {
        dispatch(signIn(payload))
    };
}

export const accountSignOut = () => {
    return (dispatch) => {
        dispatch(signOut())
    };
}

// Reducer
export default function account(state = { email: null, authenticated: false }, action) {
    switch (action.type) {
        case ACCOUNT_SIGNIN:
            return {
                    email: action.payload.email,
                    authenticated: true,
                }
        case ACCOUNT_SIGNOUT:
            return {
                    email: null,
                    authenticated: false,
                }

        default:
            return state
    }
}
