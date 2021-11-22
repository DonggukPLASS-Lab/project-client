import { 
    LOGIN_USER,
    AUTH_USER,
    GETMY_COURSES
} from '../_actions/types'

export default function(state= {}, action){
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSucces: action.payload}           
        case AUTH_USER:
            return {...state, userData: action.payload}
        case GETMY_COURSES: 
            return {...state, mylist_courses: action.payload}
        default:
            return state
    }
}