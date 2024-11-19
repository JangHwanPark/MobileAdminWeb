import api from "../api/axios.ts";
import {QueryKey, useQuery, UseQueryOptions} from "@tanstack/react-query";

export const useFetchData = <TData = unknown, TError = Error>(
    key: QueryKey, // queryKey의 타입
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    body?: Record<string, never>,
    options?: UseQueryOptions<TData, TError>
) => {
    const fetchFn = async () => {
        const response =
            method === 'GET'
                ? await api.get(endpoint)
                : await api.post(endpoint, body);
        return response.data;
    }

    return useQuery({
        queryKey: [key, body],
        queryFn: fetchFn,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        ...options
    })
};

export default useFetchData;