import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 4', () => {
  test('se a página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<NotFound />);

    history.push('/pagina-nao-encontrada');
    const { pathname } = history.location;
    expect(pathname).toBe('/pagina-nao-encontrada');

    const notFound = screen
      .getByRole('heading', { level: 2, name: /page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });

  test('se a página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif."', () => {
    const urlImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    renderWithRouter(<NotFound />);

    const cryImg = screen.getByAltText(/pikachu crying/i);

    expect(cryImg).toBeInTheDocument();
    expect(cryImg).toHaveAttribute('src', expect.stringContaining(urlImg));
  });
});
