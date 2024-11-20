import {useEffect, useState} from 'react';
import useFetchData from "../../hooks/useFetchData.ts";
import {ClockLoader} from "react-spinners";
import UserSearchForm from "../components/UserSearchForm.tsx";

type UserCompanyData = {
    company: string;
    question_cnt: number;
}[];

const User = () => {
    const [inputValue, setInputValue] = useState(""); // 입력값 상태 관리
    const [selectedPeriod, setSelectedPeriod] = useState("daily");
    const [triggerFetch, setTriggerFetch] = useState(false); // 버튼 클릭 시 데이터 요청 트리거 상태

    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPeriod(e.target.value); // 기간 선택 시 상태 업데이트
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // 기본 폼 동작 방지
        setTriggerFetch(true); // 서밋 버튼 클릭 시 데이터 요청 트리거
    };

    // 사용자별 활동 통계 요청
    const {
        data: userActivityStats,
        error: userActivityStatsError,
        isLoading: isLoadingUserActivityStats
    } = useFetchData(
        ['userActivityStats', selectedPeriod], // 상태값을 dependency로 설정하여 변경 시 자동으로 요청
        '/api/v1/admin/post/activity/user/stats', // 해당 API 호출
        "POST",
        { stats: selectedPeriod }, // body로 선택된 기간값 보내기
        {enabled: triggerFetch, // triggerFetch가 true일 때만 요청
            onSuccess: () => setTriggerFetch(false), // 성공적으로 데이터를 받아오면 triggerFetch 리셋
        });

    useEffect(() => {
        // triggerFetch가 true로 변경되면 데이터 요청을 리셋하여 다시 요청
        if (triggerFetch && selectedPeriod) {
            setTriggerFetch(false); // 요청 후 triggerFetch 리셋
        }
    }, [triggerFetch]);

    if (isLoadingUserActivityStats) return <ClockLoader/>;
    if (userActivityStatsError) return <div>Error occurred</div>;

    return (
        <div className="flex gap-2.5">
            {/* 사용자 리스트 */}
            <div className="w-[300px]">
                <h2>사용자 리스트</h2>
            </div>

            <div className="w-full ">
                {/* 사용자별 활동 통계 */}
                <form onSubmit={handleSubmit}>
                    <select onChange={handlePeriodChange} value={selectedPeriod}>
                        <option value="daily">일별</option>
                        <option value="weekly">주간</option>
                        <option value="monthly">월별</option>
                        <option value="yearly">년별</option>
                    </select>
                    <button>검색</button>
                </form>

                {/* User activity stats */}
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