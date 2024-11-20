import { useEffect, useState } from 'react';
import useFetchData from "../../hooks/useFetchData.ts";
import { ClockLoader } from "react-spinners";

type UserActivityStats = {
    company: string;
    question_cnt: number;
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

    // 사용자별 활동 통계 요청
    const {
        data: userActivityStats,
        error: userActivityStatsError,
        isLoading: isLoadingUserActivityStats
    } = useFetchData<UserActivityStats>(
        ['userActivityStats', selectedTimeFrame], // 시간 범위 상태가 변경되면 데이터 요청
        '/api/v1/admin/post/activity/user/stats', // 해당 API 호출
        "POST",
        { stats: selectedTimeFrame }, // body로 선택된 시간 범위 값 보내기
        {
            enabled: shouldFetchData, // shouldFetchData가 true일 때만 요청
            onSuccess: () => setShouldFetchData(false), // 성공적으로 데이터를 받아오면 트리거 리셋
        }
    );

    // 트리거 상태에 따른 데이터 요청
    useEffect(() => {
        if (shouldFetchData && selectedTimeFrame) {
            setShouldFetchData(false); // 요청 후 리셋
        }
    }, [shouldFetchData]);

    if (isLoadingUserActivityStats) return <ClockLoader />;
    if (userActivityStatsError) return <div>Error occurred</div>;

    return (
        <div className="flex gap-2.5">
            {/* 사용자 리스트 */}
            <div className="w-[300px]">
                <h2>사용자 리스트</h2>
            </div>

            <div className="w-full ">
                {/* 사용자별 활동 통계 */}
                <form onSubmit={handleSearchSubmit}>
                    <select onChange={handleTimeFrameChange} value={selectedTimeFrame}>
                        <option value="daily">일별</option>
                        <option value="weekly">주간</option>
                        <option value="monthly">월별</option>
                        <option value="yearly">년별</option>
                    </select>
                    <button>검색</button>
                </form>

                {/* 사용자 활동 통계 */}
                <div className="h-[300px] overflow-y-auto">
                    <h3>User Activity Stats</h3>
                    {userActivityStats && userActivityStats.map((item, index) => (
                        <div key={index}>
                            <div>
                                <span>Company: {item.company}</span>
                                <span>Question Count: {item.question_cnt}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default User;
