import React from 'react';
import axios from 'axios';
import { render, screen, cleanup, fireEvent, wait } from '@testing-library/react';
import CardList from '../../components/RelatedItems/CardList';
import RelatedItems from '../../components/RelatedItems/RelatedItems';
import exampleProductInfo from '../../components/RelatedItems/exampleProductInfo.json';
import exampleImageInfo from '../../components/RelatedItems/exampleImageInfo.json';

jest.mock('axios');

// eslint-disable-next-line import/no-unresolved
import '@testing-library/jest-dom';

describe('RelatedItems is rendering', () => {
  test('Rendering Related Items', () => {
    render(<RelatedItems related={exampleProductInfo.items} styles={exampleImageInfo.styles} />);
  });
});

// ============== CARDLIST TESTS =============== //
describe('CardList testing suite', () => {
  beforeEach(cleanup);
  test('Render heading', () => {
    render(<CardList related={exampleProductInfo.items} styles={exampleImageInfo.styles} />);

    expect(screen.getByText('Related Products!')).toBeInTheDocument();
  });

  test('check if correct number of card components has rendered successfully', () => {
    render(<CardList related={exampleProductInfo.items} styles={exampleImageInfo.styles} />);

    // Documentation requirement state only 4 cards can be present on the rendered DOM
    expect(screen.queryAllByTestId('card')).toHaveLength(4);
  });

  // test('Clicking the carousel right arrow', () => {
  //   render(<CardList related={exampleProductInfo.items} styles={exampleImageInfo.styles} />);

  //   const button = screen.getByTestId('rightArrow');
  //   fireEvent.click(button);
  //   expect(screen.queryAllByTestId('card')).toHaveLength(4);
  // });
});
