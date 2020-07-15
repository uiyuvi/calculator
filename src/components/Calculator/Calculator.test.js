import {render, within} from "@testing-library/react";
import Calculator from "./Calculator";
import React from "react";
import Display from "../Display/Display";

jest.mock('../Display/Display', () => {
    return {
        __esModule: true,
        default: jest.fn(() => <div data-testid="mockedDisplay"/>)
    };
});

describe('Calculator', function () {
    afterEach(()=>{
        Display.mockClear();
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
            displayValue : "0"
        };
        let context = {};
        expect(Display).toHaveBeenCalledWith(expectedProps,context);
    });
});
