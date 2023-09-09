/* eslint-disable i18next/no-literal-string */
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('button', () => {
    test('whatever', () => {
        render(<Button text={'test'}/>);
        expect(screen.getByText('test')).toBeInTheDocument();
    });
});
