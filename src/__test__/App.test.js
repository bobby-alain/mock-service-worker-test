import { render, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
// Mock by intercepting requests on the network level.
import { setupServer } from 'msw/node';
import { handlers, rest } from '../handlers/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Get User mock api', () => {
  const url = `http://localhost:8080/api/user`;

  it('should render (Testing) text', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Testing/i)).toBeInTheDocument();
  });

  it('should name not be there', async () => {
    const { queryByText } = render(<App />);
    expect(queryByText('Clementine Bauch')).not.toBeInTheDocument();
  });

  it('should name be there after click get user button', async () => {
    server.use(
      rest.get(url, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            name: 'Clementine Bauch',
          })
        );
      })
    );
    const { queryByText } = render(<App />);
    fireEvent.click(queryByText(/get user/i));
    await waitFor(() => {
      expect(queryByText('Clementine Bauch')).toBeInTheDocument();
    });
  });
});
