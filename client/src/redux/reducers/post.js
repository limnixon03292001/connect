
const initalState = {
    loading:false,
    newPostLoading: false,
    deleteLoading: false,
    updateLoading: false,
    commentLoading: false,
    createCommentLoading: false,
    updateCommentLoading: false,
    deleteCommentLoading: false,
    errors: null,

    posts: [],
}

const postReducer = (state= initalState, action) => {
    switch(action.type){
        case 'POSTS':
            return {...state, loading: false, errors:null, posts: [...state.posts, ...action.payload.result.map(post => state.posts.some(postx => postx._id === post._id ) ? 0 : post)] } ;

        case 'RESET_POSTS':
            return {...state, loading:true, posts: []};
            
        case 'NEW_POST': 
            return {...state, loading:false, newPostLoading: false, errors: null, posts: [ action.payload.result, ...state.posts ]};

        case 'DELETE_POST':
           return {...state, deleteLoading: false, posts: state.posts.filter((post) => post._id !== action.payload)};
        
        case 'UPDATED_POST':
            return {...state, updateLoading: false, posts: state.posts.map((post) => post._id === action.payload.result._id ? action.payload.result : post)};

        case 'COMMENT':
            return {...state, commentLoading: false, posts: state.posts.map((post) => post._id === action.payload.result._id ? {...post, comment: action.payload.result.comment} : post )};
      
        case 'UPDATE_COMMENT':
        case 'NEW_COMMENT':
            return {...state, createCommentLoading: false, updateCommentLoading: false, posts: state.posts.map((post) => post._id === action.payload.result._id ? {...post,
            comment: action.payload.result.comment} : post )};

        case 'DELETE_COMMENT':
            return {...state, 
                    deleteCommentLoading: false, 
                    posts: state.posts.map(post => post._id === action.payload.postID ? 
                        {...post, comment: post.comment.filter(
                            comment => comment._id !== action.payload.commentID
                        )}
                        : post)
                    };
  
        case 'LIKE_POST':
            return {...state,
                 posts: state.posts.map((post) => post._id === action.payload.updatedPost._id ?
                 {...post, likes: action.payload.updatedPost.likes} : post)};
                
        case 'POSTS_LOADING':
            return {...state, loading: true};

        case 'NEWPOST_LOADING':
            return {...state, newPostLoading: true};

        case 'DELETE_LOADING':
            return {...state, deleteLoading: true};
        
        case 'UPDATEPOST_LOADING':
            return {...state, updateLoading:  true};

        case 'COMMENT_LOADING':
            return {...state, commentLoading:  true}; 

        case 'CREATE_COMMENT_LOADING':
            return {...state, createCommentLoading: true}; 

        case 'UPDATE_COMMENT_LOADING':
            return {...state, updateCommentLoading: true};
        
        case 'DELETE_COMMENT_LOADING':
            return {...state, deleteCommentLoading: true};
        
        case 'ERRORS':
            return {...state, loading: false, newPostLoading: false, deleteLoading: false,  updateLoading: false, commentLoading: false, createCommentLoading: false,updateCommentLoading: false, deleteCommentLoading: false, errors: action.payload};

        default:
            return state;
    }
}

export default postReducer;