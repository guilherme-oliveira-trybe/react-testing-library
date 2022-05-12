import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 6', () => {
  test('se o nome correto do pokémon é mostrado na tela;', () => {
    renderWithRouter(<App />);

    const namePokemon = screen.getByTestId(/pokemon-name/i);
    expect(namePokemon).toBeInTheDocument();
    expect(namePokemon).toHaveTextContent(/pikachu/i);

    const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(btnNextPokemon);
    expect(namePokemon).toHaveTextContent(/charmander/i);
  });

  test('se o tipo correto do pokémon é mostrado na tela.', () => {
    renderWithRouter(<App />);

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toBeInTheDocument();
    expect(typePokemon).toHaveTextContent(/electric/i);

    const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(btnNextPokemon);
    expect(typePokemon).toHaveTextContent(/fire/i);
  });

  test('se o peso médio do pokémon é mostrado na tela', () => {
    renderWithRouter(<App />);

    const measur = screen.getByTestId('pokemon-weight');
    expect(measur).toBeInTheDocument();
    expect(measur).toHaveTextContent('Average weight: 6.0 kg');

    const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(btnNextPokemon);
    expect(measur).toHaveTextContent('Average weight: 8.5 kg');
  });

  test('se a imagem do pokémon é exibida na tela', () => {
    renderWithRouter(<App />);

    const imgPokemon = screen.getByAltText(/pikachu sprite/i);
    expect(imgPokemon).toBeInTheDocument();
    expect(imgPokemon).toHaveAttribute('src', expect.stringContaining('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png'));
    expect(imgPokemon).toHaveAttribute('alt', expect.stringContaining('Pikachu sprite'));

    const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(btnNextPokemon);
    expect(imgPokemon).toHaveAttribute('src', expect.stringContaining('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png'));
    expect(imgPokemon)
      .toHaveAttribute('alt', expect.stringContaining('Charmander sprite'));
  });

  test('se o card do pokémon indicado na pokédex contém um link para mais detalhes',
    () => {
      renderWithRouter(<App />);

      const moreDetails = screen.getByRole('link', { name: /more details/i });
      expect(moreDetails).toBeInTheDocument();
      expect(moreDetails).toHaveAttribute('href', expect
        .stringContaining('/pokemons/25'));

      const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(btnNextPokemon);
      expect(moreDetails).toHaveAttribute('href', expect
        .stringContaining('/pokemons/4'));
    });

  test('se ao clicar no link é feito o redirecionamento da aplicação', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const sumaryText = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(sumaryText).toBeInTheDocument();

    history.push('/pokemons/10');
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/10');
  });

  test('se existe um ícone de estrela nos pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const isFavorite = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(isFavorite);

    const imgStar = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(imgStar).toBeInTheDocument();
    expect(imgStar).toHaveAttribute('src', expect.stringContaining('/star-icon.svg'));
    expect(imgStar).toHaveAttribute('alt', expect
      .stringContaining('Pikachu is marked as favorite'));
  });
});
