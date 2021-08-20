import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import ColorList from './ColorList';

const fakeColors = [{id: 0, color: 'TESTCOLOR', code: { hex: '' }}]

test("Renders an empty list of colors without errors", () => {
    render(<ColorList colors={[]}/>)
});

test("Renders a list of colors without errors", () => {
    render(<ColorList colors={fakeColors}/>)

    const newColor = screen.getByText(/TESTCOLOR/i);

    expect(newColor).toBeInTheDocument();
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
    const { rerender } = render(<ColorList editing={true} colors={fakeColors} />);

    let editMenu = screen.queryByTestId(/edit_menu/i);

    expect(editMenu).not.toBeNull();
    expect(editMenu).toBeInTheDocument();

    rerender(<ColorList editing={false} colors={fakeColors}/>)
    editMenu = screen.queryByTestId(/edit_menu/i);

    expect(editMenu).toBeNull();
    expect(editMenu).not.toBeInTheDocument();
});
