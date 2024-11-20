import React, {useState} from 'react';
import useFetchData from "../../hooks/useFetchData.ts";
import {ClockLoader} from "react-spinners";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import UserSearchForm from "../../User/components/UserSearchForm.tsx";

interface Activity {
    company: string;
    question_cnt: number;
    comment_cnt: number;
}

interface CompanyYearData {
    year: number;
    comment_count: number;
    question_count: number;  // Include any other fields that are returned
}


const CompanyPage = () => {
    const [inputValue, setInputValue] = useState(""); // 입력값 상태 관리
    const [selectValue, setSelectValue] = useState("");
    const [dynamicUrl, setDynamicUrl] = useState<string | null>(null); // 동적 URL 상태 관리
    console.log('select: ' + selectValue);
    const handleSelectByKeyword = (e) => {
        setSelectValue(e.target.value);
    }

    const {
        data: activities,
        error: activitiesError,
        isLoading: isLoadingActivities,
    } = useFetchData<Activity[]>(
        ['companyActivities'],
        '/api/v1/admin/get/activity/company',
        "GET");

    const {
        data: companyData,
        error: companyDataError,
        isLoading: isLoadingCompanyData,
    } = useFetchData<Activity[]>(
        ['companyActivities'],
        '/api/v1/admin/post/company/question/top',
        "GET");

    const {
        data: companyYear,
        error: companyYearError,
        isLoading: isLoadingCompanyYear
    } = useFetchData<CompanyYearData[]>(
        ['companyYear'],
        `/api/v1/admin/post/company/${selectValue || "NEXON"}`,
        "POST");

    if (isLoadingActivities || isLoadingCompanyYear || isLoadingCompanyData) return <ClockLoader/>;
    if (activitiesError || companyYearError || companyDataError) return <div>Error occurred</div>;
    console.log(companyData)

    return (
        <div>
            <div className="w-full mx-auto flex flex-col p-5">
                <div>
                    <p className="text-2xl font-bold mb-4">Top 10 Company</p>

                    {/* 헤더 부분 */}
                    <div className="grid grid-cols-4 gap-4 mb-2 text-sm font-semibold text-gray-700">
                        <span>회사명</span>
                        <span>질문 개수</span>
                        <span>코멘트 개수</span>
                        <span>총합</span>
                    </div>

                    {/* 회사 리스트 부분 */}
                    {companyData.map(item => (
                        <div
                            key={item.company}
                            className="grid grid-cols-4 gap-4 py-2 px-4 border-b border-gray-300 text-sm text-gray-800 hover:bg-gray-50"
                        >
                            <span>{item.company}</span>
                            <span>{item.question_cnt}</span>
                            <span>{item.comment_cnt}</span>
                            <span>{item.total_activity_count}</span>
                        </div>
                    ))}
                </div>
            </div>

            <header className="mb-10 p-5 bg-white rounded-lg shadow-md">
                {/* 검색 폼 영역 */}
                <div className="flex flex-col mb-6">
                    <UserSearchForm
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        setDynamicUrl={setDynamicUrl}
                        urlTemplate="/api/v1/admin/post/company/{input}"
                    />
                </div>

                {/* 회사선택 드롭다운 영역 */}
                <div className="flex items-center space-x-4">
                    <p className="font-semibold text-lg text-gray-700">회사 선택</p>
                    <select
                        onChange={handleSelectByKeyword}
                        className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {activities.map(item => (
                            <option key={item.company} value={item.company}>
                                {item.company}
                            </option>
                        ))}
                    </select>
                </div>
            </header>


            <h2>소속 회사별 활동 현황</h2>
            <BarChart
                width={1200}
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
                width={1200}
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

            <h2>{selectValue} 의 연도별 활동 현황</h2>
            <div>
                <button>Question</button>
                <button>Comment</button>
            </div>
            <div style={{width: '100%', height: 300}}>
                <ResponsiveContainer>
                    <AreaChart
                        data={companyYear}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="year" interval={0} angle={-45} textAnchor="end"/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type="monotone" dataKey="question_count" stroke="#8884d8" fill="#8884d8"/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div style={{width: '100%', height: 300}}>
                <ResponsiveContainer>
                    <AreaChart
                        data={companyYear}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="year" interval={0} angle={-45} textAnchor="end"/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type="monotone" dataKey="comment_count" stroke="#8884d8" fill="#8884d8"/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CompanyPage;
