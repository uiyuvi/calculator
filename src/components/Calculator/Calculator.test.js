import {fireEvent, getByText, render, screen, within} from "@testing-library/react";
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

function mockKeyPad() {
    return jest.fn(() => <div data-testid="mockedKeypad"/>);
}

jest.mock('../Keypad/Keypad', () => {
    return {
        __esModule: true,
        default: mockKeyPad()
    };
});

const restoreOriginalKeyPad = () => {
    Keypad.mockImplementation(
        require.requireActual('../Keypad/Keypad').default
    )
};

const mockKeypadAfterRestore = () => {
    Keypad.mockImplementation(jest.fn(() => <div data-testid="mockedKeypad"/>))
};

describe('Calculator', function () {
    beforeEach(() => {
        jest.resetModules();
    });

    afterEach(() => {
        Display.mockClear();
        Keypad.mockClear();
    });

    test('should render a <div />', () => {
        const {container} = render(<Calculator/>);
        expect(container.firstChild.classList.contains('calculator-container')).toBe(true)
    });

    describe('Display component', function () {
        test('should render the Component', () => {
            const {container} = render(<Calculator/>);

            let firstChild = container.firstChild;
            expect(within(firstChild).getAllByTestId('mockedDisplay').length).toBe(1);
            let expectedProps = {
                displayValue: '0'
            };
            let context = {};
            expect(Display).toHaveBeenCalledWith(expectedProps, context);
        });

        test('should update the Component', () => {
            restoreOriginalKeyPad();
            const {container} = render(<Calculator/>);


            let expectedProps = {
                displayValue: '0'
            };
            let context = {};
            expect(Display).toHaveBeenCalledWith(expectedProps, context);

            fireEvent.click(getByText(container, /2/i))
            fireEvent.click(getByText(container, /3/i))
            fireEvent.click(getByText(container, /4/i))

            expectedProps = {
                displayValue: '234'
            };
            expect(Display).toHaveBeenCalledWith(expectedProps, context);
            mockKeypadAfterRestore();
        });
    });

    test('should render the Keypad Component', () => {
        const {container} = render(<Calculator/>);

        let firstChild = container.firstChild;
        expect(within(firstChild).getAllByTestId('mockedKeypad').length).toBe(1);
        let expectedContext = {};
        let expectedProps = {
            numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            operators: ['+', '-', '*', '/'],
            updateDisplay: expect.any(Function)
        };
        expect(Keypad).toHaveBeenCalledWith(expectedProps, expectedContext);
    });
});
