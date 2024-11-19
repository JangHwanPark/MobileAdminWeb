import React from "react";
import useFetchData from "../../hooks/useFetchData.ts";
import {ClockLoader} from "react-spinners";

const Home = () => {
    const {
        data: responseTime,
        error: responseError,
        isLoading: isResponseIsLoading,
    } = useFetchData(
        ['responseTime'],
        '/api/v1/admin/post/5/response/time',
        'POST');

    if (isResponseIsLoading) return <ClockLoader/>
    if (responseError) return <div>Error occurred</div>;

    console.log(responseTime)
    return (
        <div>
            <pre>{JSON.stringify(responseTime, null, 2)}</pre>
        </div>
    );
};

export default Home;