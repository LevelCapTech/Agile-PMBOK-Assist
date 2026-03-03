import updatedFetch from './fetch';
// @ts-expect-error global.fetch override for polyfill
global.fetch = updatedFetch;
