import React from 'react';

const CommentCount = ({commentCount}) => {
    return (
        <div>
            <h2>Question Count</h2>
            <pre>{JSON.stringify(commentCount, null, 2)}</pre>
        </div>
    );
};

export default CommentCount;