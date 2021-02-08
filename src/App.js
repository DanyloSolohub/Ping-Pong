import React, {useReducer, useState} from "react";
import Game from "./components/game";
import './App.css'
export default function App() {
    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_PLAYERS': {
                return {
                    ...state,
                    state: action.payload
                }
            }
            default: {
                console.error('not valid case')
                return state
            }
        }
    }
    const initialState = null
    const [state, dispatch] = useReducer(reducer, initialState)
    const [inputValue, inputChange] = useState('')
    const [status, setStatus] = useState(false)
    const onFormSubmit = (e) => {
        e.preventDefault()
    }
    const setPlayer = () => {
        dispatch({type: 'SET_PLAYERS', payload: inputValue})
        setStatus(true)
    }

    return (
        <div>
            <div className={'inputDiv'}>
            {!status && <form onSubmit={onFormSubmit}>
                <input placeholder={'Enter your name'} value={inputValue} onChange={({target: {value}}) => inputChange(value)} type="text"/>
                <button onClick={setPlayer} disabled={!inputValue}>Let`s go !1!</button>
            </form>} </div>
            {status && <Game item={state.state}/>}
        </div>
    );
}
