import React, {useEffect, useState} from "react";
import SelectComponent from "../../components/SelectComponent.tsx";
import useFetchData from "../../hooks/useFetchData.ts";
import {ClockLoader} from "react-spinners";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const Question = () => {
    const [selectedData, setSelectedData] = useState({
        year: 2010,
        keyword: "question",
    });

    // 2010 ~ 2024까지의 연도 배열
    const years = Array.from({ length: 15 }, (_, i) => 2010 + i);

    // 시간 범위 선택 시 상태 업데이트
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelectedData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 검색 버튼 클릭 시 데이터 요청 트리거
    const [shouldFetchData, setShouldFetchData] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // 기본 폼 동작 방지
        setShouldFetchData(true); // 데이터 요청 트리거
    };

    // 기간별 게시글 조회
    const {
        data: periodQuestionCount,
        error: periodQuestionCountError,
        isLoading: isLoadingPeriodQuestionCount,
    } = useFetchData(
        ['popularTopics'],
        '/api/v1/admin/get/question/period/count',
        "GET");

    // 년별 질문 등록 횟수 조회
    const {
        data: userActivityStats = [], // 초기값을 빈 배열로 설정
        error: userActivityStatsError,
        isLoading: isLoadingUserActivityStats
    } = useFetchData(
        ['userActivityStats'], // 시간 범위 상태가 변경되면 데이터 요청
        '/api/v1/admin/get/yearly/question/count', // 해당 API 호출
        "GET");

    // 월별 데이터
    const {
        data: monthlyPostCount = [], // 초기값을 빈 배열로 설정
        error: monthlyPostCountError,
        isLoading: isLoadingMonthlyPostCount,
    } = useFetchData(
        ['monthlyPostCount', selectedData], // 시간 범위 상태가 변경되면 데이터 요청
        `/api/v1/admin/post/${selectedData.year}/${selectedData.keyword}/count`, // 해당 API 호출
        "POST",
        { stats: selectedData.keyword },
        { enabled: shouldFetchData }); // shouldFetchData가 true일 때만 요청

    // 폼 제출 후 refetch 트리거 해제
    useEffect(() => {
        if (shouldFetchData) setShouldFetchData(false); // 트리거 해제
    }, [shouldFetchData]);

    if (isLoadingPeriodQuestionCount || isLoadingUserActivityStats || isLoadingMonthlyPostCount) return <ClockLoader/>;
    if (periodQuestionCountError || userActivityStatsError || monthlyPostCountError) return <div>Error occurred</div>;

    return (
        <div>
            {/* 오늘, 주간, 월간, 년간 등록된 게시글 */}
            <div className="space-y-4 mb-10">
                <div className="flex gap-4 overflow-x-auto">
                    {periodQuestionCount.map((item, index) => (
                        <div key={index} className="flex-shrink-0 w-[220px] bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition">
                            <p className="text-lg font-semibold text-gray-800">{item.period}</p>
                            <div className="flex items-center justify-between">
                                <p className="text-2xl font-bold text-blue-600">{item.post_count} 개 작성</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 월별 질문 등록 횟수 조회 */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                <p className="text-xl font-semibold text-gray-800">월별 질문 등록 횟수 조회</p>
                <div className="flex gap-4">
                    <select
                        onChange={handleChange}
                        name="type" id="type"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedData.keyword}
                    >
                        <option value="question">질문</option>
                        <option value="comment">답변</option>
                    </select>
                    <SelectComponent
                        name="year"
                        id="year"
                        array={years}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleChange}
                        value={selectedData.year}
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">검색</button>
            </form>

            <div className="mt-5">
                <LineChart
                    width={1200}
                    height={400}
                    data={monthlyPostCount}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="month"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="count" stroke="#82ca9d"/>
                </LineChart>
            </div>

            {/* 년별 질문 등록 횟수 조회 recharts */}
            <div className="mt-10">
                <p className="p-6 text-xl font-semibold text-gray-800">년별 질문 등록 횟수 조회</p>
                <LineChart
                    width={1200}
                    height={400}
                    data={userActivityStats}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="year"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="question_count" stroke="#82ca9d"/>
                </LineChart>
            </div>

            {/* 주제별 활동 분석 */}
            {/* get_activity_by_topic 호출 */}
            <div>

            </div>
        </div>
    );
};

export default Question;