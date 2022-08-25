import baseApi from "../../baseApi";

export const POST_MESSAGES_REQUEST = 'POST_MESSAGES_REQUEST';
export const POST_MESSAGES_SUCCESS = 'POST_MESSAGES_SUCCESS';
export const POST_MESSAGES_FAILURE = 'POST_MESSAGES_FAILURE';

export const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_FAILURE = 'GET_MESSAGES_FAILURE';

export const postMessagesRequest = () => ({type: POST_MESSAGES_REQUEST});
export const postMessagesSuccess = () => ({type: POST_MESSAGES_SUCCESS});
export const postMessagesFailure = error => ({type: POST_MESSAGES_FAILURE, payload: error});

export const getMessagesRequest = () => ({type: GET_MESSAGES_REQUEST});
export const getMessagesSuccess = items => ({type: GET_MESSAGES_SUCCESS, payload: items});
export const getMessagesFailure = error => ({type: GET_MESSAGES_FAILURE, payload: error});


export const getMessages = () => {
    return async dispatch => {
        try {
            dispatch(getMessagesRequest());
            const response = await baseApi('/messages');
            if(response.data !== null) {
                dispatch(getMessagesSuccess(response.data));
            }
        } catch (e) {
            dispatch(getMessagesFailure(e.message));
        }
    };
};


export const postMessages = Data => {
    return async dispatch => {
        try {
            dispatch(postMessagesRequest());
            await baseApi.post('/messages', Data);
            dispatch(postMessagesSuccess());
        } catch (e) {
            dispatch(postMessagesFailure(e.message));
        }
    };
};



