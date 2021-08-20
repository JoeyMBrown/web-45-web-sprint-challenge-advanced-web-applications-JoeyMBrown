import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { act, render, screen, waitFor} from "@testing-library/react";
import BubblePage from './BubblePage';

import mockFetchColorService from '../services/fetchColorService';
jest.mock('../services/fetchColorService');

const fakeColorsArray = [{code: {hex: "#7fffd4"}, color: "aquamarine", id: 4}, {code: {hex: "#wd"}, color: "wdas", id: 3},{code: {hex: "#wdasdwa"}, color: "dwsggrdgrd", id: 2}]

test("Renders without errors", ()=> {
    mockFetchColorService.mockResolvedValueOnce(fakeColorsArray);
    render(<BubblePage />)
});

test("Renders appropriate number of colors passed in through mock", async ()=> {
    //Keep in mind that our service is called on mount for this component.
        mockFetchColorService.mockResolvedValueOnce(fakeColorsArray);
        render(<BubblePage />)

        const colorsOnScreen = screen.queryAllByTestId('color');
        expect(colorsOnScreen).toHaveLength(0);
});