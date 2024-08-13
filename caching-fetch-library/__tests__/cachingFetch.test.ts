import { cache, preloadCachingFetch } from '../cachingFetch';

describe('preloadCachingFetch', () => {
  it('should store data in cache when response is successful', async () => {
    const url = 'https://api.example.com/data';
    const mockData = [
      {
        first: 'Loraine',
        last: 'Dickens',
        email: 'Loraine.Dickens@keven.info',
        address: '891 Karina Turnpike',
        created: 'May 14, 2018',
        balance: '$3,787.90',
      },
      {
        first: 'Glen',
        last: 'Schultz',
        email: 'orangewolf28@gmail.com',
        address: '2706 Braun Junctions',
        created: 'April 28, 2022',
        balance: '$6,798.42',
      },
    ];

    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        }) as Promise<Response>,
    );

    const setSpy = jest.spyOn(cache, 'set');

    await preloadCachingFetch(url);

    expect(fetch).toHaveBeenCalledWith(url);
    expect(setSpy).toHaveBeenCalledWith(url, mockData);
  });

  it('should log an error when response is not successful', async () => {
    const url = 'https://api.example.com/data';

    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          ok: false,
          statusText: 'Not Found',
        }) as Promise<Response>,
    );

    console.error = jest.fn();

    await preloadCachingFetch(url);

    expect(fetch).toHaveBeenCalledWith(url);
    expect(console.error).toHaveBeenCalledWith(
      `Failed to preload data for ${url}:`,
      new Error('Error: Not Found'),
    );
  });
});
