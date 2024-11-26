import { useState } from "react";
import useFetchData from "../../hooks/useFetchData.ts";
import { ClockLoader } from "react-spinners";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import DashboardNavigation from "../components/DashboardNavigation.tsx";
import DataCard from "../components/DataCard.tsx";

type PopularTopicData = {
    topic: string;
    question_count: number;
};

type GetAllData = {
    total_question_count: number;
    total_comment_count: number;
    total_user_count: number;
}

const Dashboard = () => {
    const [selectedView, setSelectedView] = useState<string>("recentTopics");

    const handleSelectNavMenu = (view: string) => {
        setSelectedView(view);
    };

    // 각 통계 API 호출
    const {
        data: popularTopics,
        error: topicsError,
        isLoading: isLoadingTopics,
    } = useFetchData<PopularTopicData[]>(['popularTopics'], '/api/v1/admin/get/popular/topics', "GET");

    // 전체 질문 및 댓글 수 API 호출
    const {
        data: totalUserCommentQuestion,
        error: totalUserCommentQuestionError,
        isLoading: isLoadingTotalUserCommentQuestion,
    } = useFetchData<GetAllData[]>(['totalUserCommentQuestion'], '/api/v1/admin/get/all/data', 'GET');

    if (isLoadingTopics || isLoadingTotalUserCommentQuestion) return <ClockLoader />;
    if (topicsError || totalUserCommentQuestionError) return <div>Error occurred</div>;
    console.log(totalUserCommentQuestion)

    return (
        <div className="grid">

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
                {/* 전체 사용자 */}
                <DataCard
                    title="전체 사용자"
                    props={totalUserCommentQuestion[0].total_user_count}/>

                {/* 전체 게시글 */}
                <DataCard
                    title="전체 질문"
                    props={totalUserCommentQuestion[0].total_question_count}/>

                {/* 전체 코멘트 */}
                <DataCard
                    title="전체 코멘트"
                    props={totalUserCommentQuestion[0].total_comment_count}/>
            </div>
            <DashboardNavigation onClick={handleSelectNavMenu}/>

            {/* Content: 조건부 렌더링 */}
            {selectedView === "recentTopics" && (
                <div className="flex flex-col gap-10 p-5 bg-gray-100 rounded-lg shadow-md">
                    {/* Chart Section */}
                    <div className="flex flex-col lg:flex-row gap-5">
                        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">최근 인기있는 주제</h2>
                            <BarChart width={600} height={400} data={popularTopics} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="topic" interval={0} angle={-45} textAnchor="end" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="question_count" fill="#82ca9d" />
                            </BarChart>
                        </div>

                        {/* Topics List Section */}
                        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">주제 목록</h2>
                            <div className="space-y-4">
                                {popularTopics.map(item => (
                                    <div key={item.topic} className="flex justify-between items-center border-b py-2">
                                        <span className="text-gray-700 font-medium">{item.topic}</span>
                                        <span className="text-gray-600">{item.question_count} 질문</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedView === "userStats" && (
                <div>
                    <h2>사용자 활동 통계</h2>
                    {/* 사용자 활동 통계에 대한 마크업을 여기에 추가 */}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
