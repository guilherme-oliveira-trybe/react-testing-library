import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  test('se ao clicar em "Home" a página é redirecionada para "/"', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('se ao clicar em "About" a página é redirecionada para "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('ao clicar em "Favorite Pokémons" a pág é redirecionada para "/favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavorites).toBeInTheDocument();
    userEvent.click(linkFavorites);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('ao entrar em uma URL desconhecida, a pág é redirecionada para Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina-nao-encontrada');

    const notFound = screen
      .getByRole('heading', { level: 2, name: /page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
});
