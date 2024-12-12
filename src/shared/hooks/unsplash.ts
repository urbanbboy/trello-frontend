import { createApi } from "unsplash-js";

export const unsplash = createApi({
    accessKey: __UNSPLASH_API_KEY__,
    fetch: fetch,
});
