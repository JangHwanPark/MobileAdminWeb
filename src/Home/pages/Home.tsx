import useFetchData from "../../hooks/useFetchData.ts";
import {ClockLoader} from "react-spinners";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {useState} from "react";

const Home = () => {
    const [selectedView, setSelectedView] = useState<string>("recentTopics"); // 상태값 정의

    // 버튼 클릭 핸들러
    const handleSelectNavMenu = (view: string) => {
        setSelectedView(view); // 선택한 버튼에 따라 상태 업데이트
        console.log(selectedView)
    };

    const {
        data: activityTopics,
        error: activityTopicsError,
        isLoading: isResponseIsLoading,
    } = useFetchData(
        ['responseTime'],
        '/api/v1/admin/get/activity/topics',
        'GET');

    const {
        data: popularTopics,
        error: topicsError,
        isLoading: isLoadingTopics,
    } = useFetchData(
        ['popularTopics'],
        '/api/v1/admin/get/popular/topics',
        "GET");

    if (isResponseIsLoading || isLoadingTopics) return <ClockLoader/>
    if (activityTopicsError || topicsError) return <div>Error occurred</div>;

    return (
        <div>
            {/* Navigation */}
            <div>
                <button onClick={() => handleSelectNavMenu("recentTopics")}>최근 인기 토픽</button>
                <button onClick={() => handleSelectNavMenu("activityTopics")}>주제별 활동</button>
            </div>

            {/* Content: 조건부 렌더링 */}
            {selectedView === "recentTopics" && (
                <div>
                    <h2>최근 인기있는 주제</h2>
                    <BarChart
                        width={600}
                        height={400}
                        data={popularTopics}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
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
                    <BarChart
                        width={600}
                        height={400}
                        data={activityTopics}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="topic" interval={0} angle={-45} textAnchor="end" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="question_count" fill="#82ca9d" />
                    </BarChart>
                </div>
            )}
        </div>
    );
};

export default Home;