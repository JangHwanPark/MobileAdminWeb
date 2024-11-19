import React from 'react';
import CompanyActivities from "../components/CompanyActivities.tsx";
import PopularTopics from "../components/PopularTopics.tsx";
import useFetchData from "../../hooks/useFetchData.ts";
import {ClockLoader, FadeLoader} from "react-spinners";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import TabNavBar from "../components/TabNavBar.tsx";

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
    console.log(activities)
    return (
        <div>
            <TabNavBar/>
            <BarChart
                width={3000}
                height={400}
                data={activities}
                margin={{top: 20, right: 30, left: 20, bottom: 5}}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="company" interval={0} angle={-45} textAnchor="end"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="comment_cnt" fill="#82ca9d"/>
            </BarChart>

            <BarChart
                width={2400}
                height={400}
                data={activities}
                margin={{top: 20, right: 30, left: 20, bottom: 5}}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="company" interval={0} angle={-45} textAnchor="end"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="question_cnt" fill="#82ca9d"/>
            </BarChart>

            <BarChart
                width={600}
                height={400}
                data={popularTopics}
                margin={{top: 20, right: 30, left: 20, bottom: 5}}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="topic" interval={0} angle={-45} textAnchor="end"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="question_count" fill="#82ca9d"/>
            </BarChart>
            {/*<CompanyActivities activities={activities || []} />
            <PopularTopics topics={popularTopics || []} />*/}
        </div>
    );
};

export default CompanyPage;
