import {render} from "@testing-library/react";
import React from "react";
import Keypad from "./Keypad";

describe('Keypad component', function () {
    test('should render a <div />', () => {
        const {container} = render(<Keypad
            numbers={[]}
        />);
        expect(container.firstChild.classList.contains('keypad-container')).toBe(true)
    });

    test('should display numbers', () => {
        let numbers = [0, 1, 2];
        const {container} = render(<Keypad
            numbers={numbers}
        />);

        let displayElement = container.querySelectorAll('div.numbers-container div.key-container.number-key');
        numbers.forEach((number, index) => {
            expect(displayElement[index].querySelector('p.key-value').innerHTML).toEqual(number.toString());
        })

    })
});
