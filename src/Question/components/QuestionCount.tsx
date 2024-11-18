import React from 'react';

const QuestionCount = ({questionCount}) => {
    return (
        <div>
            <h2>Question Count</h2>
            <pre>{JSON.stringify(questionCount, null, 2)}</pre>
        </div>
    );
};

export default QuestionCount;