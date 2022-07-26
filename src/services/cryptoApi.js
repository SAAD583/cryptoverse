import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'a347e0dd66msh5b23434b5b9d3f0p105f9djsnfbd2654696da',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }), 
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => ({url:`/coins?limit=${count}`, headers: cryptoApiHeaders})
        }),
        getCryptoExchanges: builder.query({
            query: () => ({url:`/exchanges`, headers: cryptoApiHeaders})
        }),
        getCryptoDetails: builder.query({
            query: (uuId) => ({url: `/coin/${uuId}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`, headers: cryptoApiHeaders})
        }),
        getCryptoHistory: builder.query({
            query: ({uuId}) => ({url: `/coin/${uuId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=1y`, headers: cryptoApiHeaders})
        })
    })
    
})

export const {
    useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetCryptoExchangesQuery
} = cryptoApi;