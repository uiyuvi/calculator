import React from 'react';
import {render, within} from '@testing-library/react';
import App from './App';

jest.mock('../Calculator/Calculator', () => {
    return {
        __esModule: true,
        default: () => {
            return <div  data-testid="mockedCalculator"/>;
        },
    };
});


describe('App', function () {
    test('should render a <div />', () => {
        const {container} = render(<App/>);
        expect(container.firstChild.classList.contains('app-container')).toBe(true)
    });

    test('should render Calculator component', () => {
        const {container} = render(<App/>);

        let firstChild = container.firstChild;
        expect(within(firstChild).getAllByTestId('mockedCalculator').length).toBe(1);
    });
});
