import React from 'react';
import CompanyActivities from "../components/CompanyActivities.tsx";
import PopularTopics from "../components/PopularTopics.tsx";
import useFetchData from "../../hooks/useFetchData.ts";
import {ClockLoader, FadeLoader} from "react-spinners";

const CompanyPage = () => {
    const {
        data: activities,
        error: activitiesError,
        isLoading: isLoadingActivities,
    } = useFetchData(
        ['companyActivities'],
        '/api/v1/admin/get/activity/company',
        "GET");

    const {
        data: popularTopics,
        error: topicsError,
        isLoading: isLoadingTopics,
    } = useFetchData(
        ['popularTopics'],
        '/api/v1/admin/get/popular/topics',
        "GET");

    if (isLoadingActivities || isLoadingTopics) return <ClockLoader/>;
    if (activitiesError || topicsError) return <div>Error occurred</div>;

    return (
        <div>
            <CompanyActivities activities={activities || []} />
            <PopularTopics topics={popularTopics || []} />
        </div>
    );
};

export default CompanyPage;
