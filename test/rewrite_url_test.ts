import { rewriteUrlStrings } from '../src';

const input = JSON.stringify(
  {
    steamUrl: 'http://cloud-3.steamusercontent.com/ugc/8/B/',
    localHost: 'http://localhost/some/path',
    anotherUrl: 'https://anotherhost.com/some/path',
  },
  undefined,
  '  ',
);

test('should support no-op rewrite URL', () => {
  expect(rewriteUrlStrings(input)).toEqual(input);
});

test('should ban Steam URLs', () => {
  expect(() =>
    rewriteUrlStrings(input, {
      ban: /http\:\/\/.*\.steamusercontent.com/,
    }),
  ).toThrowError('Unsupported URL');
});

test('should rewrite to localhost', () => {
  expect(
    rewriteUrlStrings(input, {
      from: 'https://anotherhost.com',
      to: 'http://localhost',
    }),
  ).toEqual(
    JSON.stringify(
      {
        steamUrl: 'http://cloud-3.steamusercontent.com/ugc/8/B/',
        localHost: 'http://localhost/some/path',
        anotherUrl: 'http://localhost/some/path',
      },
      undefined,
      '  ',
    ),
  );
});