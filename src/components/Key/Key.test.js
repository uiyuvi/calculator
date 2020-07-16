import {render} from "@testing-library/react";
import React from "react";
import Key from "./Key";

describe('Key component', function () {
    test('should display value for number key', () => {
        const {container} = render(<Key
            keyType={"number-key"}
            keyValue={0}
        />);

        let displayElement = container.querySelector('div.key-container.number-key');
        expect(displayElement.querySelector('p.key-value').innerHTML).toEqual("0");
    })

    test('should display value for operator key', () => {
        const {container} = render(<Key
            keyType={"operator-key"}
            keyValue={"+"}
        />);

        let displayElement = container.querySelector('div.key-container.operator-key');
        expect(displayElement.querySelector('p.key-value').innerHTML).toEqual("+");
    })


    test('should display value for submit key', () => {
        const {container} = render(<Key
            keyType={"submit-key"}
            keyValue={"="}
        />);

        let displayElement = container.querySelector('div.key-container.submit-key');
        expect(displayElement.querySelector('p.key-value').innerHTML).toEqual("=");
    })
});
