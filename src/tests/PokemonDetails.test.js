import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 7', () => {
  test('se as informações detalhadas do pokémon selecionado são mostradas na tela',
    () => {
      renderWithRouter(<App />);

      const moreDetails = screen.queryByRole('link', { name: /more details/i });
      userEvent.click(moreDetails);

      const pokemonDetails = screen.getByRole('heading',
        { level: 2, name: 'Pikachu Details' });
      expect(pokemonDetails).toBeInTheDocument();
      expect(moreDetails).not.toBeInTheDocument();

      const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
      expect(summary).toBeInTheDocument();

      const paragraph = screen.getByText(/pokémon roasts hard berries/i);
      expect(paragraph).toBeInTheDocument();
    });
  test('se existe na página uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const altText = 'Pikachu location';

      renderWithRouter(<App />);

      const moreDetails = screen.queryByRole('link', { name: /more details/i });
      userEvent.click(moreDetails);

      const gameLocations = screen.getByRole('heading',
        { level: 2, name: 'Game Locations of Pikachu' });
      expect(gameLocations).toBeInTheDocument();

      const firstLocation = screen.getByText('Kanto Viridian Forest');
      const secondLocation = screen.getByText('Kanto Power Plant');
      expect(firstLocation).toBeInTheDocument();
      expect(secondLocation).toBeInTheDocument();

      const locations = screen.getAllByAltText(altText);
      expect(locations[0]).toBeInTheDocument();
      expect(locations[0]).toHaveAttribute('src', expect.stringContaining('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png'));
      expect(locations[0]).toHaveAttribute('alt',
        expect.stringContaining(altText));
      expect(locations[1]).toBeInTheDocument();
      expect(locations[1]).toHaveAttribute('src', expect.stringContaining('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png'));
      expect(locations[1]).toHaveAttribute('alt',
        expect.stringContaining(altText));
      expect(locations).toHaveLength(2);
    });
  test('se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const isFavorite = screen.getByLabelText(/pokémon favoritado?/i);
    expect(isFavorite).toBeInTheDocument();
    userEvent.click(isFavorite);

    const imgStar = screen.queryByAltText(/pikachu is marked as favorite/i);
    expect(imgStar).toBeInTheDocument();

    userEvent.click(isFavorite);
    expect(imgStar).not.toBeInTheDocument();
  });
});
