import useFetchData from "../../hooks/useFetchData.ts";
import {ClockLoader} from "react-spinners";
import {ResponsiveContainer, Treemap} from "recharts";

type ActivityTopicData = {
    topic: string;
    question_count: number;
    comment_count: number;
    total_count: number;
}

const Topic = () => {
    const {
        data: activityTopics,
        error: activityTopicsError,
        isLoading: isResponseIsLoading,
    } = useFetchData<ActivityTopicData[]>(['activityTopics'], '/api/v1/admin/get/activity/topics', 'GET');

    if (isResponseIsLoading) return <ClockLoader/>;
    if (activityTopicsError) return <div>Error occurred</div>;

    // 데이터 변환: Treemap에 적합한 형식으로 변환
    const treemapData = activityTopics.map(item => ({
        name: item.topic,
        size: item.total_count, // 'total_count'를 size로 사용
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <Treemap
                data={treemapData}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
                width={400}
                height={500}
            />
        </ResponsiveContainer>
    );
};

export default Topic;