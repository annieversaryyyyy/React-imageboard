import {
    FETCH_MESSAGE_FAILURE, FETCH_MESSAGE_REQUEST, FETCH_MESSAGE_SUCCESS,
    GET_MESSAGES_FAILURE,
    GET_MESSAGES_REQUEST, GET_MESSAGES_SUCCESS,
    POST_MESSAGES_FAILURE,
    POST_MESSAGES_REQUEST,
    POST_MESSAGES_SUCCESS
} from "../actions/MessageActions";

const initialState = {
    messages: [],
    image: '',
    lastDate: null,
    loading: false,
    error : null
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES_REQUEST:
            return {...state, loading: true, error: null};
        case GET_MESSAGES_SUCCESS:
            const items = Object.keys(action.payload).map(id => {
                const item = action.payload[id];
                return {
                    ...item, id,
                };
            });
            return {...state, messages: items, loading: false, error: null};
        case GET_MESSAGES_FAILURE:
            return {...state, loading: false, error: action.payload};
        case POST_MESSAGES_REQUEST:
            return {...state, loading: true, error: null};
        case POST_MESSAGES_SUCCESS:
            return {loading: false, error: null,messages: state.messages[action.payload], author: state.author[action.payload], image: state.image[action.payload]};
        case POST_MESSAGES_FAILURE:
            return {...state, loading: false, error: action.payload};
        default :
            return state;
    }
};

export default  Reducer;