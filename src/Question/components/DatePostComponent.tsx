type periodQuestionCountType = {
    period: string;
    post_count: number;
};

const DatePostComponent = ({ props }: { props: periodQuestionCountType[] }) => {
    return (
        <div className="space-y-4 mb-10">
            <div className="flex gap-4 overflow-x-auto">
                {props.map((item, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-[220px] bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition"
                    >
                        <p className="text-lg font-semibold text-gray-800">{item.period}</p>
                        <div className="flex items-center justify-between">
                            <p className="text-2xl font-bold text-blue-600">{item.post_count} 개 작성</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DatePostComponent;
