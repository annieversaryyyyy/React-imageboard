import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMessages, postMessages} from "../../store/actions/MessageActions";
import './Imageboard.css';
import baseApi from "../../baseApi";

const Imageboard = ({onSubmit}) => {
    const  dispatch = useDispatch();
    const [data, setData] = useState({
        author: '',
        message: '',
        image: ''
    });

    const messages = useSelector(state => state.messages.messages);

    useEffect( ()=> {
        dispatch(getMessages());
    }, [dispatch]);


    const makeNewItem = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        await dispatch(postMessages(formData));
        dispatch(getMessages());
    };


    return messages && (
        <>
            <form   onSubmit={makeNewItem} key='form'>
                <input
                    placeholder='Message'
                    type='text'
                    required
                    name='message'
                    className='messageItem'
                />

                <input
                    placeholder='Author'
                    type='text'
                    name='author'
                    className='authorItem'
                />
                <input
                    placeholder='image'
                    type='file'
                    name='image'
                />

                <button type='submit' className='btnPost'>Post item</button>
            </form>

        </>
    );
};

export default Imageboard;