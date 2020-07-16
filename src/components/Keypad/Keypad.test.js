import {render} from "@testing-library/react";
import React from "react";
import Keypad from "./Keypad";

describe('Keypad component', function () {
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

        let displayElement = container.querySelectorAll('div.numbers-container div.key-container.number-key');
        numbers.forEach((number, index) => {
            expect(displayElement[index].querySelector('p.key-value').innerHTML).toEqual(number.toString());
        });
    })

    test('should display operators', () => {
        let numbers = [0, 1, 2];
        let operators = ['+', '-', '*', '/'];
        const {container} = render(<Keypad
            numbers={numbers}
            operators={operators}
        />);

        let displayElement = container.querySelectorAll('div.operators-container div.key-container.operator-key');
        operators.forEach((operator, index) => {
            expect(displayElement[index].querySelector('p.key-value').innerHTML).toEqual(operator.toString());
        });
    })
});
