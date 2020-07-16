import {render, within} from "@testing-library/react";
import React from "react";
import Keypad from "./Keypad";
import Key from "../Key/Key";

jest.mock('../Key/Key', () => {
    return {
        __esModule: true,
        default: jest.fn(() => <div data-testid="mockedKey"/>)
    };
});

describe('Keypad component', function () {
    afterEach(() => {
        Key.mockClear();
    })
    test('should render a <div />', () => {
        const {container} = render(<Keypad
            numbers={[]}
            operators={[]}
            updateDisplay={jest.fn()}
        />);
        expect(container.firstChild.classList.contains('keypad-container')).toBe(true)
    });

    describe('numbers', function () {
        test('should display numbers', () => {
            let numbers = [0, 1, 2];
            const {container} = render(<Keypad
                numbers={numbers}
                operators={[]}
                updateDisplay={jest.fn()}
            />);

            let numberContainer = container.querySelector('div.numbers-container');
            expect(numberContainer).toBeInTheDocument();
            expect(within(numberContainer).getAllByTestId('mockedKey').length).toEqual(numbers.length);
            numbers.map((number, index) =>
                expect(Key.mock.calls[index][0]).toEqual({
                    "keyType": "number-key",
                    "keyValue": number,
                    "keyAction": expect.any(Function)
                })
            )
        })
        test('should update display on click of number', () => {
            let numbers = [1];
            let updateDisplay = jest.fn();
            render(<Keypad
                numbers={numbers}
                operators={[]}
                updateDisplay={updateDisplay}
            />);

            Key.mock.calls[0][0].keyAction(numbers[0]);

            expect(updateDisplay).toHaveBeenCalledWith(numbers[0]);
        })
    });

    test('should display operators', () => {
        let operators = ['+', '-', '*', '/'];
        const {container} = render(<Keypad
            numbers={[]}
            operators={operators}
            updateDisplay={jest.fn()}
        />);

        let operatorContainer = container.querySelector('div.operators-container');
        expect(operatorContainer).toBeInTheDocument();
        expect(within(operatorContainer).getAllByTestId('mockedKey').length).toEqual(operators.length);
        operators.map((operator, index) =>
            expect(Key.mock.calls[index][0]).toEqual({
                "keyType": "operator-key",
                "keyValue": operator,
                "keyAction": expect.any(Function)
            })
        )
    })

    test('should display submit key', () => {
        const {container} = render(<Keypad
            numbers={[]}
            operators={[]}
            updateDisplay={jest.fn()}
        />);

        let submitContainer = container.querySelector('div.submit-container');
        expect(submitContainer).toBeInTheDocument();
        expect(Key.mock.calls[0][0]).toEqual({
            "keyType": "submit-key",
            "keyValue": "=",
            "keyAction": expect.any(Function)
        })
    })
});
