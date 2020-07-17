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

    test('should render the Keypad Component', () => {
        const {container} = render(<Calculator/>);

        let firstChild = container.firstChild;
        expect(within(firstChild).getAllByTestId('mockedKeypad').length).toBe(1);
        let expectedContext = {};
        let expectedProps = {
            numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0','ce'],
            operators: ['+', '-', '*', '/'],
            updateDisplay: expect.any(Function),
            setOperator: expect.any(Function),
            calculate: expect.any(Function)
        };
        expect(Keypad).toHaveBeenCalledWith(expectedProps, expectedContext);
    });

    describe('Display component', function () {
        afterAll(()=>{
            mockKeypadAfterRestore();
        })
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
            let recentDisplayMockCall = Display.mock.calls.pop()[0];
            expect(recentDisplayMockCall).toEqual(expectedProps,context);
        });

        describe('numbers scenarios', function () {
            test('should prevent multiple instances of "." in displayValue', () => {
                restoreOriginalKeyPad();
                const {container} = render(<Calculator/>);

                let expectedProps = {
                    displayValue: '0'
                };
                let context = {};
                expect(Display).toHaveBeenCalledWith(expectedProps, context);

                fireEvent.click(getByText(container, /\./i))
                fireEvent.click(getByText(container, /\./i))

                expectedProps = {
                    displayValue: '.'
                };
                let recentDisplayMockCall = Display.mock.calls.pop()[0];
                expect(recentDisplayMockCall).toEqual(expectedProps,{});
            });

            test('should remove last entered value on selecting `ce` key', () => {
                restoreOriginalKeyPad();
                const {container} = render(<Calculator/>);

                let expectedProps = {
                    displayValue: '0'
                };
                let context = {};
                expect(Display).toHaveBeenCalledWith(expectedProps, context);

                fireEvent.click(getByText(container, /5/i))
                fireEvent.click(getByText(container, /0/i))
                expectedProps = {
                    displayValue: '50'
                };

                let recentDisplayMockCall = Display.mock.calls.pop()[0];
                expect(recentDisplayMockCall).toEqual(expectedProps,context);

                fireEvent.click(getByText(container, /ce/i))

                expectedProps = {
                    displayValue: '5'
                };
                recentDisplayMockCall = Display.mock.calls.pop()[0];
                expect(recentDisplayMockCall).toEqual(expectedProps,context);
            });

            test('should display 0 when all characters removed with `ce` key', () => {
                restoreOriginalKeyPad();
                const {container} = render(<Calculator/>);

                let expectedProps = {
                    displayValue: '0'
                };
                let context = {};
                expect(Display).toHaveBeenCalledWith(expectedProps, context);

                fireEvent.click(getByText(container, /5/i))
                fireEvent.click(getByText(container, /0/i))
                expectedProps = {
                    displayValue: '50'
                };

                let recentDisplayMockCall = Display.mock.calls.pop()[0];
                expect(recentDisplayMockCall).toEqual(expectedProps,{});

                fireEvent.click(getByText(container, /ce/i))

                expectedProps = {
                    displayValue: '5'
                };

                recentDisplayMockCall = Display.mock.calls.pop()[0];
                expect(recentDisplayMockCall).toEqual(expectedProps,{});

                fireEvent.click(getByText(container, /ce/i))

                expectedProps = {
                    displayValue: '0'
                };

                recentDisplayMockCall = Display.mock.calls.pop()[0];
                expect(recentDisplayMockCall).toEqual(expectedProps,{});
            });
        });
        describe('operators scenarios', function () {
            test('should display 0 when any of the operator selected',()=>{
                restoreOriginalKeyPad();
                const {container} = render(<Calculator/>);
                let expectedProps;
                let context = {};

                fireEvent.click(getByText(container, /5/i))
                fireEvent.click(getByText(container, /0/i))
                expectedProps = {
                    displayValue: '50'
                };

                let recentDisplayMockCall = Display.mock.calls[Display.mock.calls.length-1][0];
                expect(recentDisplayMockCall).toEqual(expectedProps,context);

                fireEvent.click(getByText(container, /\+/i))

                expectedProps = {
                    displayValue: '0'
                };
                recentDisplayMockCall = Display.mock.calls[Display.mock.calls.length-1][0];
                expect(recentDisplayMockCall).toEqual(expectedProps,context);
            })

            test('should sum the numbers',()=>{
                restoreOriginalKeyPad();
                const {container} = render(<Calculator/>);
                let expectedProps;
                let context = {};

                fireEvent.click(getByText(container, /5/i))
                fireEvent.click(getByText(container, /0/i))
                expectedProps = {
                    displayValue: '50'
                };

                let recentDisplayMockCall = Display.mock.calls[Display.mock.calls.length-1][0];
                expect(recentDisplayMockCall).toEqual(expectedProps,context);

                fireEvent.click(getByText(container, /\+/i))
                fireEvent.click(getByText(container, /3/i))

                fireEvent.click(getByText(container, /=/i))

                expectedProps = {
                    displayValue: '53'
                };
                recentDisplayMockCall = Display.mock.calls[Display.mock.calls.length-1][0];
                expect(recentDisplayMockCall).toEqual(expectedProps,context);
            })
        });
    });
});
