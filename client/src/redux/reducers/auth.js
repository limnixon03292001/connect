

const initialState = {
    loading: false, 
    authData: {},
    error:null,
}

const authReducer = ( state = initialState, action) => {
    switch (action.type) {
        case 'INSERT_USER':
            return {...state, authData: action.payload, loading:false};

        case 'LOGIN':
            localStorage.setItem('token',`${action.payload.data.token}` );
            return {...state, loading: false, };
        
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {...state, authData: {} };

        case 'ERROR':
            return {...state, loading:false , error: action.payload, };

        // case 'AUTH_ERROR':
        //     return {...state, loading:false , error: action.payload, isAuthenticated: false, token:null};
        
        case 'LOADING':
            return {...state, loading: true, error:null};
        
        case 'LOADING_DONE':
            return {...state, loading:false, error:null};

        case 'CLEAR_ERROR':
            return {...state, error:null};
         
        default:
            return state;
    }
}


export default authReducer;