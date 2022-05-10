import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Requisito 2', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<About />);

    history.push('/about');
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const textPokedex = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(textPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const firstParagraph = screen.getByText(/containing all Pokémons/i);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(/more details for each/i);
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    renderWithRouter(<About />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', expect.stringContaining(imgUrl));
  });
});
