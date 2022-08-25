import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMessages, postMessages} from "../../store/actions/MessageActions";
import './Imageboard.css';
import baseApi from "../../baseApi";
import Spinner from "../../components/UI/Spinner/Spinner";

const Imageboard = ({onSubmit}) => {
    const  dispatch = useDispatch();
    const [data, setData] = useState({
        author: '',
        message: '',
        image: ''
    });

    const messages = useSelector(state => state.messages.messages);
    const loading = useSelector(state => state.messages.loading);

    useEffect( ()=> {
        dispatch(getMessages());
    }, [dispatch]);

    const inputChange = e => {
        const {name,value} = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const makeNewItem = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        await dispatch(postMessages(formData));
        dispatch(getMessages());
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setData(prevState => ({...prevState, [name]: file}));
    };


    return messages && (
        <>


            <form   onSubmit={makeNewItem} key='form'>
                <input
                    placeholder='Message'
                    type='text'
                    required
                    name='message'
                    value={data.message}
                    onChange={inputChange}
                    className='messageItem'
                />

                <input
                    placeholder='Author'
                    type='text'
                    name='author'
                    value={data.author}
                    onChange={inputChange}
                    className='authorItem'
                />
                <input
                    placeholder='image'
                    type='file'
                    name='image'
                    onChange={fileChangeHandler}
                />

                <button type='submit' className='btnPost'>Post item</button>
            </form>

        </>
    );
};

export default Imageboard;