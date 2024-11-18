import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CompanyActivities from "../components/CompanyActivities.tsx";
import PopularTopics from "../components/PopularTopics.tsx";

// 첫 번째 API 호출
const fetchCompanyActivities = async () => {
    const response = await fetch('/api/v1/admin/get/activity/company');
    return response.json();
};

// 두 번째 API 호출
const fetchPopularTopics = async () => {
    const response = await fetch('/api/v1/admin/get/popular/topics');
    return response.json();
};

const CompanyPage = () => {
    const {
        data: activities,
        error: activitiesError,
        isLoading: isLoadingActivities } = useQuery({
        queryKey: ['companyActivities'],
        queryFn: fetchCompanyActivities,
    });

    const {
        data: popularTopics,
        error: topicsError,
        isLoading: isLoadingTopics } = useQuery({
        queryKey: ['popularTopics'],
        queryFn: fetchPopularTopics,
    });

    if (isLoadingActivities || isLoadingTopics) return <div>Loading...</div>;
    if (activitiesError || topicsError) return <div>Error occurred</div>;

    return (
        <div>
            <CompanyActivities activities={activities} />
            <PopularTopics topics={popularTopics} />
        </div>
    );
};

export default CompanyPage;
