import React, { useCallback, useReducer } from 'react';
import Input from './Input';
import './Input.css';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const FORM_INPUT_RESET = 'FORM_INPUT_RESET';


const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputVal,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            inputVal: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: updatedFormIsValid
        }
    } else if (action.type === FORM_INPUT_RESET) {
        return {
            inputVal: {
                first_name: '',
                second_name: '',
                email: '',
                country: '',
                phone: '',
                verification: ''

            },
            inputValidities: {
                first_name: false,
                second_name: false,
                email: false,
                country: false,
                phone: false,
                verification: false,
            },
            formIsValid: false
        }
    }
    return state;
}

export default function InputGroup() {

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputVal: {
            first_name: '',
            second_name: '',
            email: '',
            country: '',
            phone: '',
            verification: ''
        },
        inputValidities: {
            first_name: false,
            second_name: false,
            email: false,
            country: false,
            phone: false,
            verification: false,
        },
        formIsValid: false
    });

    const onChangeInputHandler = useCallback((inputIdentifier, inputValue, inputValidty) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidty,
            input: inputIdentifier
        })
    }, [dispatchFormState]);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const payload = {...formState.inputVal};
        console.log(payload);
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <div className="row-input">
                <div className="col-input">
                    <Input
                        className="input-eleman"
                        name="first_name"
                        type="text"
                        placeholder="First Name"
                        onChangeInput={onChangeInputHandler}
                        required
                        initvalue={formState.inputVal.first_name}
                    />
                </div>
                <div className="col-input">
                    <Input
                        className="input-eleman"
                        name="second_name"
                        type="text"
                        placeholder="Second Name"
                        onChangeInput={onChangeInputHandler}
                        required
                        initvalue={formState.inputVal.second_name}
                    />
                </div>
                <div className="col-input">
                    <Input
                        className="input-eleman"
                        name="email"
                        type="email"
                        email="true"
                        placeholder="Email"
                        onChangeInput={onChangeInputHandler}
                        required
                        initvalue={formState.inputVal.email}
                    />
                </div>
                <div className="col-input">
                    <Input
                        className="input-eleman"
                        name="country"
                        type="text"
                        placeholder="Country"
                        onChangeInput={onChangeInputHandler}
                        required
                        initvalue={formState.inputVal.country}
                    />
                </div>
                <div className="col-input">
                    <Input
                        className="input-eleman"
                        name="phone"
                        type="tel"
                        placeholder="Phone"
                        chequal={11}
                        onChangeInput={onChangeInputHandler}
                        required
                        initvalue={formState.inputVal.phone}
                    />
                </div>
                <div className="col-input">
                    <Input
                        className="input-eleman"
                        name="verification"
                        type="password"
                        placeholder="Verification"
                        onChangeInput={onChangeInputHandler}
                        required
                        initvalue={formState.inputVal.verification}
                    />
                </div>
            </div>
            <div className="row-input" style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                <div className="col-input">
                    <div className="input-container">
                        <button className="btn-trading" type="submit">
                            START TRADING
                        </button>
                    </div>
                </div>
                <div className="col-input">
                    <p className="secure-code"> Secure Code</p>
                </div>

            </div>

        </form>
    )
}
