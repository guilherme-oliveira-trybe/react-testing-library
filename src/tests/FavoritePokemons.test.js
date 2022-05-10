import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Requisito 3', () => {
  test('se é exibida a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const favoritesPokemons = screen.queryAllByAltText(/marked as favorite/i);
    expect(favoritesPokemons).toHaveLength(0);

    const message = screen.getByText(/no favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  test('se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const favoriteCheckBox = screen.getByLabelText(/pokémon favoritado?/i);
    expect(favoriteCheckBox).toBeInTheDocument();
    userEvent.click(favoriteCheckBox);

    const linkFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavorites).toBeInTheDocument();
    userEvent.click(linkFavorites);

    const favoritesPokemons = screen.getAllByAltText(/marked as favorite/i);
    expect(favoritesPokemons).toHaveLength(1);

    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);

    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const moreDetails2 = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails2).toBeInTheDocument();
    userEvent.click(moreDetails2);

    const favoriteCheckBox2 = screen.getByLabelText(/pokémon favoritado?/i);
    expect(favoriteCheckBox2).toBeInTheDocument();
    userEvent.click(favoriteCheckBox2);

    const linkFavorites2 = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavorites2).toBeInTheDocument();
    userEvent.click(linkFavorites2);

    const favoritesPokemons2 = screen.getAllByAltText(/marked as favorite/i);
    expect(favoritesPokemons2).toHaveLength(2);
  });
});
