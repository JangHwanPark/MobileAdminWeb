import SelectComponent from "../../components/SelectComponent.tsx";
import useFetchData from "../../hooks/useFetchData.ts";
import {ClockLoader} from "react-spinners";

const Question = () => {
    // 2010 ~ 2024까지의 연도 배열
    const years = Array.from({ length: 15 }, (_, i) => 2010 + i);
    // 1 ~ 12까지의 월 배열
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("검색")
    }

    const {
        data: periodQuestionCount,
        error: periodQuestionCountError,
        isLoading: isLoadingPeriodQuestionCount,
    } = useFetchData(['popularTopics'], '/api/v1/admin/get/question/period/count', "GET");

    if (isLoadingPeriodQuestionCount) return <ClockLoader/>;
    if (periodQuestionCountError) return <div>Error occurred</div>;

    console.log(periodQuestionCount)
    return (
        <div>
            {/* 오늘, 주간, 월간, 년간 등록된 게시글 */}
            <div className="space-y-4">
                <div className="flex gap-4 overflow-x-auto">
                    {periodQuestionCount.map((item, index) => (
                        <div key={index} className="flex-shrink-0 w-[220px] bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition">
                            <p className="text-lg font-semibold text-gray-800">{item.period}</p>
                            <div className="flex items-center justify-between">
                                <p className="text-2xl font-bold text-blue-600">{item.post_count} 개 작성</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 월별 질문 등록 횟수 조회 */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                <p className="text-xl font-semibold text-gray-800">월별 질문 등록 횟수 조회</p>
                <div className="flex gap-4">
                    <select name="type" id="type" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="question">질문</option>
                        <option value="comment">답변</option>
                    </select>
                    <SelectComponent
                        name="year"
                        id="year"
                        array={years}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <SelectComponent
                        name="month"
                        id="month"
                        array={months}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">검색</button>
            </form>

            {/* 년별 질문 등록 횟수 조회 */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4 mt-8">
                <p className="text-xl font-semibold text-gray-800">년별 질문 등록 횟수 조회</p>
                <div className="flex gap-4">
                    <select name="type" id="type" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="question">질문</option>
                        <option value="comment">답변</option>
                    </select>
                    <SelectComponent
                        name="year"
                        id="year"
                        array={years}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">검색</button>
            </form>

            {/* 주제별 활동 분석 */}
            {/* get_activity_by_topic 호출 */}
        </div>
    );
};

export default Question;