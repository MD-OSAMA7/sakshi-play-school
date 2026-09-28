const CACHE_VERSION = 1;

export const readCache = (key, fallback = null) => {
  try {
    const cachedValue = localStorage.getItem(key);

    if (!cachedValue) {
      return fallback;
    }

    const parsedValue = JSON.parse(cachedValue);

    if (
      !parsedValue ||
      parsedValue.version !== CACHE_VERSION ||
      !Object.prototype.hasOwnProperty.call(parsedValue, "data")
    ) {
      return fallback;
    }

    return parsedValue.data;
  } catch (error) {
    console.error(`Cache read error for "${key}":`, error);

    return fallback;
  }
};

export const writeCache = (key, data) => {
  try {
    const cachePayload = {
      version: CACHE_VERSION,
      updatedAt: Date.now(),
      data,
    };

    localStorage.setItem(key, JSON.stringify(cachePayload));
  } catch (error) {
    console.error(`Cache write error for "${key}":`, error);
  }
};

export const removeCache = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Cache remove error for "${key}":`, error);
  }
};
