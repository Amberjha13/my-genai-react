// DropdownCheckbox.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DropdownCheckbox from './DropdownCheckbox';

describe('DropdownCheckbox', () => {
  test('renders with default state', () => {
    render(<DropdownCheckbox />);
    // Add assertions based on the default state
    expect(screen.getByText('Select Options')).toBeInTheDocument();
  });

  test('opens and closes the dropdown', () => {
    render(<DropdownCheckbox />);
    // Initially closed
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();

    // Open dropdown
    fireEvent.click(screen.getByText('Select Options'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    // Close dropdown
    fireEvent.click(screen.getByText('Select Options'));
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  test('selects and displays options', () => {
    render(<DropdownCheckbox />);
    // Open dropdown
    fireEvent.click(screen.getByText('Select Options'));

    // Select options
    fireEvent.click(screen.getByLabelText('Option 1'));
    fireEvent.click(screen.getByLabelText('Option 2'));

    // Check the displayed selected options
    expect(screen.getByText('Option 1, Option 2')).toBeInTheDocument();
  });

  test('deselects options', () => {
    render(<DropdownCheckbox />);
    // Open dropdown
    fireEvent.click(screen.getByText('Select Options'));

    // Select options
    fireEvent.click(screen.getByLabelText('Option 1'));
    fireEvent.click(screen.getByLabelText('Option 2'));

    // Deselect an option
    fireEvent.click(screen.getByLabelText('Option 1'));

    // Check the displayed selected options
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  test('closes dropdown on outside click', () => {
    render(<DropdownCheckbox />);
    // Open dropdown
    fireEvent.click(screen.getByText('Select Options'));

    // Simulate outside click
    fireEvent.click(document);

    // Dropdown should be closed
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  // Add more test cases as needed
});
