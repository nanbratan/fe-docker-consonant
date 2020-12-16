import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
    render,
    screen,
} from '@testing-library/react';

import Rating from '../Rating';

describe('Consonant/Infobits/Type/Rating', () => {
    test('If invalid ratings are authored, do not show any filled stars', async () => {
        const props = {
            totalStars: -1,
            starsFilled: 3,
            label: '',
        };
        render(<Rating {...props} />);

        const [stars] = screen.getAllByTestId('rating-star');

        expect(stars.dataset.rating).toBe('0');
    });

    test('If more stars are authored then possible, do not show any filled stars', async () => {
        const props = {
            totalStars: 100,
            starsFilled: 3,
            label: '',
        };
        render(<Rating {...props} />);

        const [stars] = screen.getAllByTestId('rating-star');

        expect(stars.dataset.rating).toBe('0');
    });

    test('If a negative amount is authored for filled stars, do not show any filled stars', async () => {
        const props = {
            totalStars: 5,
            starsFilled: -10,
            label: '',
        };
        render(<Rating {...props} />);

        const [stars] = screen.getAllByTestId('rating-star');

        expect(stars.dataset.rating).toBe('0');
    });
});
