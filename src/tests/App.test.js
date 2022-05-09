import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Requisito 1', () => {
  test('se o primeiro link, possui o texto "Home"', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
  });

  test('se o primeiro link, possui o texto "About"', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();
  });

  test('se o primeiro link, possui o texto "Favorite Pokémons"', () => {
    renderWithRouter(<App />);

    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavorites).toBeInTheDocument();
  });
});
