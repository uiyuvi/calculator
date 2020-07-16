import {render, within} from "@testing-library/react";
import Calculator from "./Calculator";
import React from "react";
import Display from "../Display/Display";
import Keypad from "../Keypad/Keypad";

jest.mock('../Display/Display', () => {
    return {
        __esModule: true,
        default: jest.fn(() => <div data-testid="mockedDisplay"/>)
    };
});

jest.mock('../Keypad/Keypad', () => {
    return {
        __esModule: true,
        default: jest.fn(() => <div data-testid="mockedKeypad"/>)
    };
});

describe('Calculator', function () {
    afterEach(() => {
        Display.mockClear();
        Keypad.mockClear();
    });

    test('should render a <div />', () => {
        const {container} = render(<Calculator/>);
        expect(container.firstChild.classList.contains('calculator-container')).toBe(true)
    });
    test('should render the Display Component', () => {
        const {container} = render(<Calculator/>);

        let firstChild = container.firstChild;
        expect(within(firstChild).getAllByTestId('mockedDisplay').length).toBe(1);
        let expectedProps = {
            displayValue: "0"
        };
        let context = {};
        expect(Display).toHaveBeenCalledWith(expectedProps, context);
    });


    test('should render the Keypad Component', () => {
        const {container} = render(<Calculator/>);

        let firstChild = container.firstChild;
        expect(within(firstChild).getAllByTestId('mockedKeypad').length).toBe(1);
        let expectedContext = {};
        let expectedProps = {
            numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            operators: ['+', '-', '*', '/']
        };
        expect(Keypad).toHaveBeenCalledWith(expectedProps, expectedContext);
    });
});
