import { rest } from 'msw';

const url = `http://localhost:8080/api/user`;

const handlers = [
  rest.get(url, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: 'Clementine Bauch',
      })
    );
  }),
];

export { handlers, rest };
