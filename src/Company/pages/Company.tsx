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
    } = useFetchData(
        ['companyActivities'],
        '/api/v1/admin/get/activity/company',
        "GET");

    const {
        data: companyYear,
        error: companyYearError,
        isLoading: isLoadingCompanyYear
    } = useFetchData(
        ['companyYear'],
        `/api/v1/admin/post/company/${selectValue || "NEXON"}`,
        "POST");

    if (isLoadingActivities || isLoadingCompanyYear) return <ClockLoader/>;
    if (activitiesError || companyYearError) return <div>Error occurred</div>;
    console.log("activities")
    console.log(companyYear)
    return (
        <div>
            <header className="mx-10 mb-10">
                <UserSearchForm
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    setDynamicUrl={setDynamicUrl}
                    urlTemplate="/api/v1/admin/post/company/{input}"
                />

                <div className="flex">
                    <p className="mx-5">회사선택</p>
                    <select onChange={handleSelectByKeyword}>
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
