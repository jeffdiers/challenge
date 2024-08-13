// You may edit this file, add new files to support this file,
// and/or add new dependencies to the project as you see fit.
// However, you must not change the surface API presented from this file,
// and you should not need to change any other files in the project to complete the challenge

import { useEffect, useState } from 'react';

type UseCachingFetch = (url: string) => {
  isLoading: boolean;
  data: unknown;
  error: Error | null;
};

export const cache = new Map<string, unknown>();

/**
 * 1. Implement a caching fetch hook. The hook should return an object with the following properties:
 * - isLoading: a boolean that is true when the fetch is in progress and false otherwise
 * - data: the data returned from the fetch, or null if the fetch has not completed
 * - error: an error object if the fetch fails, or null if the fetch is successful
 *
 * This hook is called three times on the client:
 *  - 1 in App.tsx
 *  - 2 in Person.tsx
 *  - 3 in Name.tsx
 *
 * Acceptance Criteria:
 * 1. The application at /appWithoutSSRData should properly render, with JavaScript enabled, you should see a list of people.
 * 2. You should only see 1 network request in the browser's network tab when visiting the /appWithoutSSRData route.
 * 3. You have not changed any code outside of this file to achieve this.
 * 4. This file passes a type-check.
 *
 */
export const useCachingFetch: UseCachingFetch = (url) => {
  // Check if the data is cached
  const cachedData = cache.has(url) ? cache.get(url) : null;

  // Initialize state with the cached data if available
  const [isLoading, setIsLoading] = useState<boolean>(cachedData === null);
  const [data, setData] = useState<unknown>(cachedData);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If data is already cached, there's no need to fetch
    if (cachedData !== null) {
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        cache.set(url, result); // Cache the result
        setData(result);
        setIsLoading(false);
        console.log('Data fetched from API');
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, cachedData]);

  return { isLoading, data, error };
};

/**
 * 2. Implement a preloading caching fetch function. The function should fetch the data.
 *
 * This function will be called once on the server before any rendering occurs.
 *
 * Any subsequent call to useCachingFetch should result in the returned data being available immediately.
 * Meaning that the page should be completely serverside rendered on /appWithSSRData
 *
 * Acceptance Criteria:
 * 1. The application at /appWithSSRData should properly render, with JavaScript disabled, you should see a list of people.
 * 2. You have not changed any code outside of this file to achieve this.
 * 3. This file passes a type-check.
 *
 */
export const preloadCachingFetch = async (url: string): Promise<void> => {
  try {
    // Fetch the data from the URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Parse the data as JSON
    const data = await response.json();

    // Store the data in the cache
    cache.set(url, data);
    console.log('Data preloaded for', url);
  } catch (error) {
    console.error(`Failed to preload data for ${url}:`, error);
  }
};

/**
 * 3.1 Implement a serializeCache function that serializes the cache to a string.
 * 3.2 Implement an initializeCache function that initializes the cache from a serialized cache string.
 *
 * Together, these two functions will help the framework transfer your cache to the browser.
 *
 * The framework will call `serializeCache` on the server to serialize the cache to a string and inject it into the dom.
 * The framework will then call `initializeCache` on the browser with the serialized cache string to initialize the cache.
 *
 * Acceptance Criteria:
 * 1. The application at /appWithSSRData should properly render, with JavaScript enabled, you should see a list of people.
 * 2. You should not see any network calls to the people API when visiting the /appWithSSRData route.
 * 3. You have not changed any code outside of this file to achieve this.
 * 4. This file passes a type-check.
 *
 */
export const serializeCache = (): string => {
  // Convert the Map to an array of key-value pairs and then serialize to JSON
  return JSON.stringify(Array.from(cache.entries()));
};

export const initializeCache = (serializedCache: string): void => {
  try {
    // Parse the serialized string back into an array of key-value pairs
    const entries: [string, unknown][] = JSON.parse(serializedCache);
    // Populate the cache with the parsed entries
    entries.forEach(([key, value]) => cache.set(key, value));
  } catch (error) {
    console.error('Failed to initialize cache:', error);
  }
};

export const wipeCache = (): void => {
  cache.clear();
};
