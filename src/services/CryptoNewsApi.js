import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-RapidAPI-Key": "463806f105msh9817cbb864761e4p1b083bjsn2f56fd8464d2",
  "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
};
let baseUrl = "https://cryptocurrency-news2.p.rapidapi.com";
const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => createRequest(`/v1/coindesk`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
