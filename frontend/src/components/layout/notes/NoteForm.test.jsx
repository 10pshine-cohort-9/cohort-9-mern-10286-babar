import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteForm from './NoteForm';

describe('NoteForm Component Testing', () => {
  const mockFormData = { title: 'Sample Title', content: 'Sample Content' };
  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn((e) => e.preventDefault());

  test('renders note form buttons correctly', () => {
    render(
      <NoteForm 
        formData={mockFormData} 
        onChange={mockOnChange} 
        onSubmit={mockOnSubmit} 
        loading={false} 
      />
    );

    // Verify the Save button is present
    const saveButton = screen.getByRole('button', { name: /save note/i });
    expect(saveButton).toBeInTheDocument();
  });

  test('calls onChange handler when editor content updates', () => {
    render(
      <NoteForm 
        formData={mockFormData} 
        onChange={mockOnChange} 
        onSubmit={mockOnSubmit} 
        loading={false} 
      />
    );

    // Find the contenteditable editor element
    const editors = document.querySelectorAll('.rsw-ce');
    expect(editors.length).toBeGreaterThan(0);

    // Simulate input change on the rich text editor
    fireEvent.input(editors[0], { target: { innerHTML: 'Updated Title' } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});