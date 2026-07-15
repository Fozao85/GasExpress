import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

describe('App', () => {
  it('renders the app title', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const headings = screen.getAllByText('GasNow');
    expect(headings.length).toBeGreaterThanOrEqual(1);
    expect(headings[0]).toBeInTheDocument();
  });
});
