
import { UPDATE_FORM, CLEAR_FORM } from './actions'
const initialState = {
    ssn: '',
    email: '',
    phone: '',
    country: '',
}
export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_FORM:
            return {
                ...state,
                ssn: action.data.ssn,
                email: action.data.email,
                phone: action.data.phone,
                country: action.data.country,
            }
        case CLEAR_FORM:
            return initialState
        default:
            return state
    }
      
}