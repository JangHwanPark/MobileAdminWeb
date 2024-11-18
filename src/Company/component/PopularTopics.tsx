import React from 'react';

const PopularTopics = ({ topics }) => (
    <div>
        <h2>Popular Topics</h2>
        <pre>{JSON.stringify(topics, null, 2)}</pre>
    </div>
);

export default PopularTopics;