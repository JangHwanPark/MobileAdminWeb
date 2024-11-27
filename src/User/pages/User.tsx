import React, {useEffect, useState} from 'react';
import useFetchData from "../../hooks/useFetchData.ts";
import {ClockLoader} from "react-spinners";
import {IoIosRefresh} from "react-icons/io";
import {Link} from "react-router-dom";

type UserActivityStats = {
    company: string;
    question_cnt: number;
    comment_cnt: number;
}[];

type totalActivityUsers = {
    uid: number;
    name: string;
    email: string;
    company: string;
    total_activity_count: number;
}[];

const User = () => {
    // 시간 범위 상태
    const [selectedTimeFrame, setSelectedTimeFrame] = useState("daily");
    // 데이터 요청 트리거 상태
    const [shouldFetchData, setShouldFetchData] = useState(false);

    // 시간 범위 선택 시 상태 업데이트
    const handleTimeFrameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTimeFrame(e.target.value);
    };

    // 검색 버튼 클릭 시 데이터 요청 트리거
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // 기본 폼 동작 방지
        setShouldFetchData(true); // 데이터 요청 트리거
    };

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


    // 사용자별 활동 통계 요청
    const {
        data: userActivityStats = [], // 초기값을 빈 배열로 설정
        error: userActivityStatsError,
        isLoading: isLoadingUserActivityStats
    } = useFetchData<UserActivityStats>(
        ['userActivityStats', selectedTimeFrame], // 시간 범위 상태가 변경되면 데이터 요청
        '/api/v1/admin/post/activity/user/stats', // 해당 API 호출
        "POST",
        {stats: selectedTimeFrame}, // body로 선택된 시간 범위 값 보내기
        );

    // 트리거 상태에 따른 데이터 요청
    useEffect(() => {
        if (shouldFetchData && selectedTimeFrame) {
            setShouldFetchData(false); // 요청 후 리셋
        }
    }, [shouldFetchData]);

    console.log(userActivityStats)
    if (isLoadingUserActivityStats || isLoadingTopActivityUsers) return <ClockLoader/>;
    if (userActivityStatsError || topActivityUsersError) return <div>Error occurred</div>;

    return (
        /* container */
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* 사용자 활동 순위 */}
            <div className="lg:col-span-2">
                <div className="rounded-md shadow flex flex-col bg-white">
                    <h3>사용자 활동 순위</h3>
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

            {/* 사용자별 활동 통계 */}
            <div className="flex gap-10">
                <div className="w-full flex flex-col gap-4">
                    {/* 사용자별 활동 통계 */}
                    <div className="w-full">
                        {/* 사용자별 활동 통계 검색 폼 */}
                        <form className="mb-4 flex items-center gap-4" onSubmit={handleSearchSubmit}>
                            <select
                                className="border px-4 py-2 rounded-md"
                                onChange={handleTimeFrameChange}
                                value={selectedTimeFrame}>
                                <option value="daily">일별</option>
                                <option value="weekly">주간</option>
                                <option value="monthly">월별</option>
                                <option value="yearly">년별</option>
                            </select>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                                type="submit"
                                disabled={isLoadingUserActivityStats}>
                                {isLoadingUserActivityStats ? '검색 중...' : '검색'}
                            </button>
                        </form>

                        {/* 사용자 활동 통계 */}
                        <div className="h-[300px] overflow-y-auto p-4 bg-white rounded-md shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">사용자 활동 통계</h3>
                            {userActivityStats.length === 0 ? (
                                <div>No data available</div>
                            ) : (
                                userActivityStats.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center border-b py-2">
                                        <div className="text-gray-800">{item.company}</div>
                                        <div className="text-gray-600">질문: {item.question_cnt}</div>
                                        <div className="text-gray-600">코멘트: {item.comment_cnt}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
