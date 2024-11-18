import React from 'react';

const CommentCount = ({commentCount}) => {
    console.log(commentCount);
    return (
        <div>
            <h2>Question Count</h2>
            {commentCount.map(item => (
                <div key={item.uid}>
                    <span>{item.uid}</span>
                    <span>{item.name}</span>
                    <span>{item.company}</span>
                    <span>{item.comment_count}</span>
                </div>
            ))}
            {/*<pre>{JSON.stringify(commentCount, null, 2)}</pre>*/}
        </div>
    );
};

export default CommentCount;