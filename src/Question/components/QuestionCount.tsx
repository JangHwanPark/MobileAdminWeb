const QuestionCount = ({questionCount = []}) => {
    console.log(questionCount)
    return (
        <div>
            <h2>Question Count</h2>
            <div>
            </div>
            {questionCount.map(item => (
                <div key={item.uid}>
                    <span>{item.uid}</span>
                    <span>{item.name}</span>
                    <span>{item.company}</span>
                    <span>{item.question_count}</span>
                </div>
            ))}
            {/*<pre>{JSON.stringify(questionCount, null, 2)}</pre>*/}
        </div>
    );
};

export default QuestionCount;