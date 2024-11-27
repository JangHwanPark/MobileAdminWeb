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
import CompanyTab from "../components/CompanyTab.tsx";

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
    const [active, setActive] = useState(0);

    const handleSelectByKeyword = (e) => {
        setSelectValue(e.target.value);
    }

    const {
        data: activities = [],
        error: activitiesError,
        isLoading: isLoadingActivities,
    } = useFetchData<Activity[]>(
        ['activities'],
        '/api/v1/admin/get/activity/company',
        "GET");

    const {
        data: companyData = [],
        error: companyDataError,
        isLoading: isLoadingCompanyData,
    } = useFetchData<Activity[]>(
        ['companyData'],
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

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            {/* Top 10 Company */}
            <div className="mb-10 lg:col-span-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Top 10 Company</h2>

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
            <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">질문 개수</h2>
                <BarChart
                    width={550}
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
            </div>
            <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">코멘트 개수</h2>
                <BarChart
                    width={550}
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
            </div>

            {/* Select Company */}
            <header className="mt-10 mb-3 lg:col-span-4 p-5 bg-white rounded-lg shadow-md">
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
            <div className="px-5 lg:col-span-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {selectValue} 의 연도별 활동 현황
                </h2>
                <nav className="px-5 py-4 border-b">
                    <ul className="flex space-x-1 lg:space-x-2 overflow-clip">
                        <CompanyTab
                            title="Question"
                            active={active === 0}
                            onClick={() => setActive(0)}/>
                        <CompanyTab
                            title="Comment"
                            active={active === 1}
                            onClick={() => setActive(1)}/>
                    </ul>
                </nav>
                <div className="h-[400px]">
                    <ResponsiveContainer>
                        <AreaChart
                            data={companyYear}
                            margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="year"/>
                            <YAxis/>
                            <Tooltip/>
                            <Area type="monotone" dataKey={active === 0 ? "question_count" : "comment_count"} stroke="#8884d8" fill="#8884d8"/>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
        ;
};

export default CompanyPage;
