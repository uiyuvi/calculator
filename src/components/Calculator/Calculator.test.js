import {render} from "@testing-library/react";
import Calculator from "./Calculator";
import React from "react";

describe('Calculator', function () {
    test('should render a <div />', () => {
        const {container} = render(<Calculator/>);
        expect(container.firstChild.classList.contains('calculator')).toBe(true)
    });
});
