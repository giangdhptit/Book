import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    adminInfo: null
}

const appReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                adminInfo: action.adminInfo
            }
        case actionTypes.ADMIN_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            console.log('p_l')
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }
        default:
            return state;
    }
}

export default appReducer;