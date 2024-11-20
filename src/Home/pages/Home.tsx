import { useState } from "react";
import useFetchData from "../../hooks/useFetchData.ts";
import { ClockLoader } from "react-spinners";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

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
    } = useFetchData(['popularTopics'], '/api/v1/admin/get/popular/topics', "GET");

    const {
        data: activityTopics,
        error: activityTopicsError,
        isLoading: isResponseIsLoading,
    } = useFetchData(['activityTopics'], '/api/v1/admin/get/activity/topics', 'GET');

    // 전체 질문 및 댓글 수 API 호출
    const {
        data: totalQuestionCount,
        isLoading: isLoadingTotalQuestionCount,
    } = useFetchData<number[]>(['totalQuestionCount'], '/api/v1/admin/get/total/questions', 'GET');

    const {
        data: totalCommentCount,
        isLoading: isLoadingTotalCommentCount,
    } = useFetchData<number[]>(['totalCommentCount'], '/api/v1/admin/get/total/comments', 'GET');

    if (isResponseIsLoading || isLoadingTopics || isLoadingTotalQuestionCount || isLoadingTotalCommentCount)
        return <ClockLoader />;
    if (activityTopicsError || topicsError) return <div>Error occurred</div>;

    return (
        <div>
            <div>
                {/* Navigation */}
                <button onClick={() => handleSelectNavMenu("recentTopics")}>최근 인기 토픽</button>
                <button onClick={() => handleSelectNavMenu("activityTopics")}>주제별 활동</button>
                <button onClick={() => handleSelectNavMenu("totalQuestions")}>전체 질문 수</button>
                <button onClick={() => handleSelectNavMenu("totalComments")}>전체 코멘트 수</button>
                <button onClick={() => handleSelectNavMenu("userStats")}>사용자 활동 통계</button>
            </div>

            {/* Content: 조건부 렌더링 */}
            {selectedView === "recentTopics" && (
                <div>
                    <h2>최근 인기있는 주제</h2>
                    <BarChart width={600} height={400} data={popularTopics} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="topic" interval={0} angle={-45} textAnchor="end" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="question_count" fill="#82ca9d" />
                    </BarChart>
                </div>
            )}

            {selectedView === "activityTopics" && (
                <div>
                    <h2>주제별 활동</h2>
                    <BarChart width={600} height={400} data={activityTopics} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="topic" interval={0} angle={-45} textAnchor="end" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="question_count" fill="#82ca9d" />
                    </BarChart>
                </div>
            )}

            {selectedView === "totalQuestions" && (
                <div>
                    <h2>전체 질문 수</h2>
                    <div>{totalQuestionCount ? totalQuestionCount[0] : "Loading..."}</div>
                </div>
            )}

            {selectedView === "totalComments" && (
                <div>
                    <h2>전체 코멘트 수</h2>
                    <div>{totalCommentCount ? totalCommentCount[0] : "Loading..."}</div>
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
