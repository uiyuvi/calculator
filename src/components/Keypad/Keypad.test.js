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
        />);
        expect(container.firstChild.classList.contains('keypad-container')).toBe(true)
    });

    test('should display numbers', () => {
        let numbers = [0, 1, 2];
        const {container} = render(<Keypad
            numbers={numbers}
            operators={[]}
        />);

        let numberContainer = container.querySelector('div.numbers-container');
        expect(numberContainer).toBeInTheDocument();
        expect(within(numberContainer).getAllByTestId('mockedKey').length).toEqual(numbers.length);
        numbers.map((number, index) =>
            expect(Key.mock.calls[index][0]).toEqual({
                "keyType": "number-key",
                "keyValue": number
            })
        )
    })

    test('should display operators', () => {
        let operators = ['+', '-', '*', '/'];
        const {container} = render(<Keypad
            numbers={[]}
            operators={operators}
        />);

        let operatorContainer = container.querySelector('div.operators-container');
        expect(operatorContainer).toBeInTheDocument();
        expect(within(operatorContainer).getAllByTestId('mockedKey').length).toEqual(operators.length);
        operators.map((operator, index) =>
            expect(Key.mock.calls[index][0]).toEqual({
                "keyType": "operator-key",
                "keyValue": operator
            })
        )
    })

    test('should display submit key', () => {
        const {container} = render(<Keypad
            numbers={[]}
            operators={[]}
        />);

        let submitContainer = container.querySelector('div.submit-container');
        expect(submitContainer).toBeInTheDocument();
        expect(Key.mock.calls[0][0]).toEqual({
            "keyType": "submit-key",
            "keyValue": "="
        })
    })
});
