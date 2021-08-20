import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

const fakeObj = {
    name: 'testColor',
    color: 'testColor',
        code: {
            hex: ''
    },
}

test("Renders without errors with blank color passed into component", () => {
    render(<Color color={fakeObj}/>)
});
  
test("Renders the color passed into component", () => {
    render(<Color color={fakeObj}/>)

    const renderedColor = screen.getByText(/testcolor/i);

    expect(renderedColor).toBeInTheDocument();
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    const fakeDeleteColor = jest.fn();
    const fakeToggleEdit = jest.fn();
    render(<Color color={fakeObj} toggleEdit={fakeToggleEdit} deleteColor={fakeDeleteColor} />)

    const handleDeleteBttn = screen.getByTestId('delete')

    userEvent.click(handleDeleteBttn);

    const mockLen = fakeToggleEdit.mock.calls.length;
    expect(mockLen).toBe(1);
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    const fakeSetEditColor = jest.fn();
    const fakeToggleEdit = jest.fn();
    render(<Color color={fakeObj} setEditColor={jest.fn()} toggleEdit={fakeToggleEdit} setEditColor={fakeSetEditColor} />)

    const handleEditBttn = screen.getByTestId('color')

    userEvent.click(handleEditBttn);

    const mockLen = fakeSetEditColor.mock.calls.length;
    expect(mockLen).toBe(1);
    
});