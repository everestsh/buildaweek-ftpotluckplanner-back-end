import { FETCH_START, FETCH_SUCCESS } from '../actions';
const initialState = {
    isLoggedIn: false,
    
}
const reducer = (state = initialState , action) => {
    switch (action.type) {
        case FETCH_START:
            return {
                ...state,
                isLoggedIn : false
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                isLoggedIn : true
            }
        default:
            return state
    }
}

export default reducer;