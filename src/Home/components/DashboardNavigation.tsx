type props = {
    onClick: (activityTopics: string) => void;
}

const DashboardNavigation = ({onClick}: props) => {
    return (
        <div className="h-[50px] col-12 flex justify-between items-center">
            {/* Navigation */}
            <button onClick={() => onClick('recentTopics')}>최근 인기 토픽</button>
            <button onClick={() => onClick("activityTopics")}>주제별 활동</button>
            <button onClick={() => onClick('userStats')}>사용자 활동 통계</button>
        </div>
    );
};

export default DashboardNavigation;