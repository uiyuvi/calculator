import {render} from "@testing-library/react";
import Display from './Display';
import React from "react";

describe('Display', function () {
    test('should render a <div />', () => {
        const {container} = render(<Display/>);
        expect(container.firstChild.classList.contains('display-container')).toBe(true)
    });
});
