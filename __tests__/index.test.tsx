import { List } from '@/components/List';
import { render, screen, fireEvent, getByText } from '@testing-library/react';

describe('Sanity', () => {
  const MockData = [
    {
      id: 'binance',
      name: 'Binance',
      image:
        'https:;;assets.coingecko.com/markets/images/52/small/binance.jpg?1519353250',
      year_stablished: 2017,
      country: 'Cayman Islands',
      trust_score: 10,
      trade_volume_24h_btc: 1009677.3113063427,
    },
  ];

  it('should render correctly', () => {
    render(<List data={[]} />);
  });

  it('should display next and previous age buttons', () => {
    render(<List data={[]} />);

    screen.getByRole('button', { name: /próxima página/i });
    screen.getByRole('button', { name: /página anterior/i });
  });

  it('should display data as a list', () => {
    render(<List data={MockData} />);

    const mockItem = MockData[0];

    screen.getByText(mockItem.name);
    screen.getByText(mockItem.year_stablished);
    screen.getByText(mockItem.country);
    screen.getByText(mockItem.trust_score);
    screen.getByText(mockItem.trade_volume_24h_btc);
  });
});

describe('Navigation', () => {
  const MockData = [
    {
      id: 'binance',
      name: 'Binance',
      image:
        'https:;;assets.coingecko.com/markets/images/52/small/binance.jpg?1519353250',
      year_stablished: 2017,
      country: 'Cayman Islands',
      trust_score: 10,
      trade_volume_24h_btc: 1009677.3113063427,
    },
    {
      id: 'ex2',
      name: 'Ex2',
      image:
        'https:;;assets.coingecko.com/markets/images/52/small/binance.jpg?1519353250',
      year_stablished: 2010,
      country: 'Cayman Islands',
      trust_score: 10,
      trade_volume_24h_btc: 1009677.3113063427,
    },
    {
      id: 'ex3',
      name: 'Ex3',
      image:
        'https:;;assets.coingecko.com/markets/images/52/small/binance.jpg?1519353250',
      year_stablished: 2011,
      country: 'Cayman Islands',
      trust_score: 10,
      trade_volume_24h_btc: 1009677.3113063427,
    },
  ];

  it('should be able to navigate to enxt page', () => {
    const mockedNextFunc = jest.fn();
    const mockedPrevFunc = jest.fn();
    render(
      <List
        page={2}
        data={MockData}
        onNextCallback={mockedNextFunc}
        onPrevCallback={mockedPrevFunc}
      />
    );

    const buttonNextPage = screen.getByRole('button', {
      name: /próxima página/i,
    });
    const buttonPrevPage = screen.getByRole('button', {
      name: /página anterior/i,
    });

    fireEvent(
      buttonNextPage,
      new MouseEvent('click', {
        bubbles: true,
      })
    );
    expect(mockedNextFunc).toBeCalledTimes(1);

    fireEvent(
      buttonPrevPage,
      new MouseEvent('click', {
        bubbles: true,
      })
    );
    expect(mockedPrevFunc).toBeCalledTimes(1);
  });

  it('should disable prev page on first page', () => {
    render(<List data={MockData} page={1} />);

    const buttonPrevPage = screen.getByRole('button', {
      name: /página anterior/i,
    });

    expect(buttonPrevPage).toHaveProperty('disabled', true);
  });
});

describe('Result', () => {
  it('should display sem resultados for empty data', () => {
    render(<List data={[]} page={1} />);

    screen.getByText(/sem resultados/i);
  });
});
