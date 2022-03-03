
// i combine user and users so that i dont get confused

const initialState = {
    loading: false, 
    userUpdateLoading: false,
    userLoading: false,
    userFollowingLoading: false,
    searchLoading: false,
    userFollowerLoading: false,

    users: [],
    currentUserFollowers: [],
    user: { followers:[]}, 
    searchUser: [],

    page: 1,
    pageFollowers: 1,

    error:null,
}


const usersReducer = ( state = initialState, action) => {
    switch (action.type) {
        case 'USERS': 
            return {...state, loading:false, users: [...state.users, ...action.payload.result.map(user => user)], error:null};

        case 'USERS_FOLLOWERS':
            return {...state, userFollowerLoading: false, currentUserFollowers: [...state.currentUserFollowers , ...action.payload.result.map(follower => follower)], error:null };

        case 'CLEAR_USERS':
            return {...state, users:[], currentUserFollowers:[]};

        case 'USERS_LOADING':
            return {...state, loading: true, error:null};

        case 'CLEAR_ERROR':
            return {...state, error:null};
        
        //for single user profile
        case 'UPDATE_LOADING':
            return {...state, userUpdateLoading: true}

        case 'USER_LOADING': 
            return {...state,  userLoading: true}
            
        case 'USER':
        case 'UPDATE_USER':
            return {...state, user: action.payload.result, userLoading: false, userUpdateLoading: false};

        case 'FOLLOW_USER':
            return {...state, userFollowingLoading: false, user: {...state.user, followers: action.payload.followUser.followers }};

        case 'USER_FOLLOWING_LOADING':
            return {...state, userFollowingLoading: true};
        
        case 'USER_FOLLOWERS_LOADING':
            return {...state, userFollowerLoading: true};

        case 'SEARCH_LOADING':
            return {...state, searchLoading: true};

        case 'SEARCH_USER':
            return {...state, searchLoading: false, searchUser: action.payload.result, error:null};

        case 'CLEAR_SEARCH_USER':
            return {...state, searchLoading: false, searchUser: [], error:null};    

        case 'PAGE':
            return {...state, page: state.page + 1};
        
        case 'PAGE_FOLLOWERS':
            return {...state, pageFollowers: state.pageFollowers + 1};
            
        case 'SETPAGE_DEFAULT':
            return {...state, page: 1};

        case 'SETPAGEFOLLOWERS_DEFAULT':
            return {...state, pageFollowers: 1};

        case 'USERS_ERROR':
                return {...state, loading:false , userUpdateLoading: false, userLoading: false, userFollowingLoading: false, searchLoading: false, userFollowerLoading: false, error: action.payload, };
        default:
            return state;
    }
}


export default usersReducer;