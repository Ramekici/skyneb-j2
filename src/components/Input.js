import React, { useReducer, useEffect, useState } from 'react'

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_FOCUS = 'INPUT_FOCUS';
const INPUT_RESET = 'INPUT_RESET';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_FOCUS:
            return {
                ...state,
                touched: true
            }
        case INPUT_RESET:
            return {
                value: '',
                isValid: false,
                touched: false,
            }
        default:
            return state;
    }
};

const Input = (props) => {

    const [inputState, dispatchInputState] = useReducer(inputReducer, {
        value: props.initvalue ? props.initvalue : '',
        isValid: props.initialValid ? props.initialValid : false,
        touched: false,
    });

    const [error, setError] = useState('');
    const { touched } = inputState;

    const { onChangeInput, name, completed } = props;

    useEffect(() => {
        onChangeInput(name, inputState.value, inputState.isValid);
    }, [onChangeInput, inputState.value, inputState.isValid, name]);

    useEffect(() => {
        if (touched) {
            setError("Bu alan boş bırakılamaz.");
        }
    }, [touched]);


    useEffect(() => {
        dispatchInputState({
            type: INPUT_RESET
        })
    }, [completed])

    const onChangeHandler = (event) => {

        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        let isValid = true;

        if (props.email && !emailRegex.test(event.target.value.toLowerCase())) {
            isValid = false;
            setError("Email doğru giriniz.");
        }

        if (props.min !== null && +event.target.value < props.min) {
            isValid = false;
        }
        if (props.max !== null && +event.target.value > props.max) {
            isValid = false;
        }
        if (props.minLength !== null && event.target.value.length < props.minLength) {
            isValid = false;
            setError(`Minimum ${props.minLength} karakter girilmelidir.`);
        }
        if (props.type === "tel" && props.chequal !== null && event.target.value.length !== props.chequal) {
            isValid = false;
            setError( `${props.chequal} numara girilmelidir.`);
        }
        if (props.required && event.target.value.trim().length === 0) {
            isValid = false;
            setError("Alan Boş Bırakılmamalıdır.");
        }

        dispatchInputState({
            type: INPUT_CHANGE,
            value: event.target.value,
            isValid: isValid
        })
    }

    const lostFocusHandler = () => {
        dispatchInputState({
            type: INPUT_FOCUS
        })
    }


    useEffect(() => {
        if (completed) {
            dispatchInputState({
                type: INPUT_CHANGE,
                value: '',
                isValid: false
            })
        }
    }, [completed])

    return (
        <div className="input-container">
            <input
                {...props}
                value={inputState.value}
                onChange={onChangeHandler}
                onFocus={lostFocusHandler} />
                {!inputState.isValid && inputState.touched &&
                <div className="invalid-feedback" style={{ display: "block" }}> {error} </div>}
        </div>

    )
}



export default Input;