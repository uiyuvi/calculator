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
    let renderedContainer;
    function renderComponent() {
        const {container} = render(<App/>);
        renderedContainer = container;
    }

    test('should render a <div />', () => {
        renderComponent();

        expect(renderedContainer.firstChild.classList.contains('app-container')).toBe(true)
    });

    test('should render Calculator component', () => {
        renderComponent()

        let firstChild = renderedContainer.firstChild;
        expect(within(firstChild).getAllByTestId('mockedCalculator').length).toBe(1);
    });
});
