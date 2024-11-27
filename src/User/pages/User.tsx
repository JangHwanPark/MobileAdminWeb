import React, {useEffect, useState} from 'react';
import useFetchData from "../../hooks/useFetchData.ts";
import {ClockLoader} from "react-spinners";
import {IoIosRefresh} from "react-icons/io";
import {Link} from "react-router-dom";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

type totalActivityUsers = {
    uid: number;
    name: string;
    email: string;
    company: string;
    total_activity_count: number;
}[];

const User = () => {
    const currentTime = new Date().toLocaleString("ko-kr", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const {
        data: topActivityUsers = [],
        error: topActivityUsersError,
        isLoading: isLoadingTopActivityUsers,
    } = useFetchData<totalActivityUsers[]>(
        ['getTopActivityUsers'],
        '/api/v1/admin/get/top/activity/users',
        'GET');

    const {
        data: monthlyData = [],
        error: monthlyDataError,
        isLoading: isLoadingMonthlyData,
    } = useFetchData(
        ['monthlyData'],
        '/api/v1/admin/get/monthly/user/signup/count',
        'GET');

    const {
        data: yearlyData = [],
        error: yearlyDataError,
        isLoading: isLoadingYearlyData,
    } = useFetchData(
        ['yearData'],
        '/api/v1/admin/get/yearly/user/signup/count',
        'GET');

    if (isLoadingTopActivityUsers || isLoadingYearlyData || isLoadingMonthlyData) return <ClockLoader/>;
    if (topActivityUsersError || yearlyDataError || monthlyDataError) return <div>Error occurred</div>;

    return (
        /* container */
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* 사용자 활동 순위 */}
            <div className="lg:col-span-2">
                <div className="rounded-md shadow flex flex-col bg-white">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">사용자 활동 순위</h2>
                    <ul className="flex flex-col overflow-y-auto divide-y">
                        {topActivityUsers.map((item, idx) => (
                            <li className="flex flex-col" key={idx}>
                                <Link to="/#" className="px-5 py-3 hover:bg-gray-100">
                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-col">
                                            <span className="font-medium truncate">{item.name}</span>
                                            <span className="text-xs text-gray-500">{item.email}</span>
                                        </div>
                                        <span className="">{item.total_activity_count}</span>
                                    </div>
                                    <div className="flex space-x-1 mt-1 text-sm">
                                        <span className="text-gray-500">by</span>
                                        <span className="text-gray-800">{item.company}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="px-5 py-4 bg-gray-50 rounded-b-md flex justify-between items-center">
                <span className="text-xs font-light text-gray-500">
                  Refreshed since {currentTime}
                </span>
                        <button className="focus:outline-none text-indigo-600">
                            <IoIosRefresh className="w-4 h-4"/>
                        </button>
                    </div>
                </div>
            </div>

            {/* 월별 */}
            <div className="lg:col-span-3">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">년도별 사용자 생성 수</h2>
                    <LineChart
                        width={700}
                        height={400}
                        data={yearlyData}
                        margin={{top: 20, right: 30, left: 20, bottom: 5}}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="year"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Line type="monotone" dataKey="user_signup_count" stroke="#82ca9d"/>
                    </LineChart>
                </div>
            </div>

            {/* 년별 */}
        </div>
    );
};

export default User;
