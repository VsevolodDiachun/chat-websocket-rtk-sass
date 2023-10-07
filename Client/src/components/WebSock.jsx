import React, {useRef, useState} from 'react';
import style from '../Styles/Style.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {messengerSlice} from "../store/reducers/messageSlice";

const WebSock = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const {setConnected, setUsername, addMessage} = messengerSlice.actions
    const {connected, username, messages} = useSelector(state => state.messengerReducer)
    const socket = useRef()

    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5001')
        socket.current.onopen = () => {
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
            dispatch(setConnected(true))
            console.log('Connected')
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            dispatch(addMessage(message))
        }
        socket.current.onclose = () => {
            console.log('Socket close')
        }
        socket.current.onerror = () => {
            console.log('Socket error')
        }
    }

    const sendMessage = async () => {
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message))
        setValue('')
    }

    if (!connected) {
        return (
            <div className={style.center}>
                <div className={style.form}>
                    <input
                        value={username}
                        onChange={e => dispatch(setUsername(e.target.value))}
                        type="text"
                        placeholder="Enter name"/>
                    <button onClick={connect}>Login</button>
                </div>
            </div>
        )
    }

    return (
        <div className={style.center}>
            <div>
                <div className={style.form}>
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        type="text"
                        placeholder={username}
                    />
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div>
                    {messages.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ?
                                <div className={style.connection_message}>
                                    Пользователь {mess.username} подключился
                                </div>
                                :
                                <div className={style.message}>
                                    {mess.username}: {mess.message}
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WebSock;