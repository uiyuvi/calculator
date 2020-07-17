import {render, within} from "@testing-library/react";
import Calculator from "./Calculator";
import React from "react";
import Display from "../Display/Display";
import Keypad from "../Keypad/Keypad";
import {act} from 'react-dom/test-utils';

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

    describe('Display component', function () {
        test('should render the Component', () => {
            const {container} = render(<Calculator/>);

            let firstChild = container.firstChild;
            expect(within(firstChild).getAllByTestId('mockedDisplay').length).toBe(1);
            let expectedProps = {
                displayValue: 0
            };
            let context = {};
            expect(Display).toHaveBeenCalledWith(expectedProps, context);
        });

        test('should update the Component', () => {
            render(<Calculator/>);


            let expectedProps = {
                displayValue: 0
            };
            let context = {};
            expect(Display).toHaveBeenCalledWith(expectedProps, context);

            act(() => {
                Keypad.mock.calls[0][0].updateDisplay(2);
            });

            expectedProps = {
                displayValue: 2
            };
            expect(Display).toHaveBeenCalledWith(expectedProps, context);
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
