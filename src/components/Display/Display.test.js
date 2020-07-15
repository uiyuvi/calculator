import {render, screen} from "@testing-library/react";
import Display from './Display';
import React from "react";

describe('Display', function () {
    test('should render a <div />', () => {
        const {container} = render(<Display displayValue=""/>);
        expect(container.firstChild.classList.contains('display-container')).toBe(true)
    });

    test('should display value passed in prop`displayValue`', () => {
        const {container} = render(<Display displayValue="0"/>);

        let displayElement = container.querySelector('p.display-value');
        expect(screen.getByText('0', displayElement)).toBeInTheDocument();
    });
});
