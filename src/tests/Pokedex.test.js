import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 5', () => {
  test('se a página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const text = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(text).toBeInTheDocument();
  });

  test('se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado',
    () => {
      const pokemons = ['Pikachu',
        'Charmander', 'Caterpie',
        'Ekans', 'Alakazam',
        'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

      renderWithRouter(<App />);

      const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(btnNextPokemon).toBeInTheDocument();

      userEvent.click(btnNextPokemon);
      const charmander = screen.getByTestId(/pokemon-name/i, { name: pokemons[1] });
      expect(charmander).toBeInTheDocument();

      userEvent.click(btnNextPokemon);
      const ekans = screen.getByTestId(/pokemon-name/i, { name: pokemons[3] });
      expect(ekans).toBeInTheDocument();

      userEvent.click(btnNextPokemon);
      const alakazam = screen.getByTestId(/pokemon-name/i, { name: pokemons[4] });
      expect(alakazam).toBeInTheDocument();

      userEvent.click(btnNextPokemon);
      const mew = screen.getByTestId(/pokemon-name/i, { name: pokemons[5] });
      expect(mew).toBeInTheDocument();

      userEvent.click(btnNextPokemon);
      const rapidash = screen.getByTestId(/pokemon-name/i, { name: pokemons[6] });
      expect(rapidash).toBeInTheDocument();

      userEvent.click(btnNextPokemon);
      const snorlax = screen.getByTestId(/pokemon-name/i, { name: pokemons[7] });
      expect(snorlax).toBeInTheDocument();

      userEvent.click(btnNextPokemon);
      const dragonair = screen.getByTestId(/pokemon-name/i, { name: pokemons[8] });
      expect(dragonair).toBeInTheDocument();

      userEvent.click(btnNextPokemon);
      const pikachu = screen.getByTestId(/pokemon-name/i, { name: pokemons[0] });
      expect(pikachu).toBeInTheDocument();
    });

  test('se é mostrado apenas um pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId(/pokemon-name/i);

    expect(pokemon).toHaveLength(1);
  });

  test('se a Pokédex tem os botões de filtro, sem repetição', () => {
    renderWithRouter(<App />);

    const btnElectric = screen.getAllByRole('button', { name: /electric/i });
    expect(btnElectric).toHaveLength(1);

    const btnFire = screen.getAllByRole('button', { name: /fire/i });
    expect(btnFire).toHaveLength(1);

    const btnBug = screen.getAllByRole('button', { name: /bug/i });
    expect(btnBug).toHaveLength(1);

    const btnPoison = screen.getAllByRole('button', { name: /poison/i });
    expect(btnPoison).toHaveLength(1);

    const btnPsychic = screen.getAllByRole('button', { name: /psychic/i });
    expect(btnPsychic).toHaveLength(1);

    const btnNormal = screen.getAllByRole('button', { name: /normal/i });
    expect(btnNormal).toHaveLength(1);

    const btnDragon = screen.getAllByRole('button', { name: /dragon/i });
    expect(btnDragon).toHaveLength(1);
  });

  test('ao clicar em botão de tipo, a Pokédex deve mostrar somente os pokemons do tipo',
    () => {
      renderWithRouter(<App />);

      const btnFire = screen.getByRole('button', { name: /fire/i });
      expect(btnFire).toBeInTheDocument();
      userEvent.click(btnFire);

      const typeFire = screen.getByTestId('pokemon-type', { name: /fire/i });
      expect(typeFire).toBeInTheDocument();

      const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(btnNextPokemon);
      expect(typeFire).toBeInTheDocument();

      const btnBug = screen.getByRole('button', { name: /bug/i });
      expect(btnBug).toBeInTheDocument();
      userEvent.click(btnBug);

      const typeBug = screen.getByTestId('pokemon-type', { name: /bug/i });
      expect(typeBug).toBeInTheDocument();

      userEvent.click(btnNextPokemon);
      expect(typeBug).toBeInTheDocument();
    });

  test('se o texto do botão corresponde ao nome do tipo, ex. Psychic;', () => {
    renderWithRouter(<App />);

    const btnFire = screen.getByRole('button', { name: /fire/i });
    expect(btnFire).toBeInTheDocument();
    expect(btnFire).toHaveTextContent('Fire');

    const btnElectric = screen.getByRole('button', { name: /electric/i });
    expect(btnElectric).toBeInTheDocument();
    expect(btnElectric).toHaveTextContent('Electric');

    const btnBug = screen.getByRole('button', { name: /bug/i });
    expect(btnBug).toBeInTheDocument();
    expect(btnBug).not.toHaveTextContent('Dragon');
  });

  test('se o botão "All" está sempre visível.', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();
    expect(btnAll).not.toHaveAttribute('disable');
    expect(btnAll).toBeVisible();
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    const pokemons = ['Pikachu', 'Charmander', 'Caterpie'];

    renderWithRouter(<App />);

    const btnAll = screen.getByTestId('', { name: /all/i });
    expect(btnAll).toBeInTheDocument();
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent(pokemons[0]);

    const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(btnAll);
    expect(pokemon).toHaveTextContent(pokemons[0]);
    userEvent.click(btnNextPokemon);
    expect(pokemon).toHaveTextContent(pokemons[1]);
    userEvent.click(btnNextPokemon);
    expect(pokemon).toHaveTextContent(pokemons[2]);
  });
});
