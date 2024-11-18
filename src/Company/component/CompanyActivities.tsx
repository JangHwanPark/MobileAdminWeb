import React from 'react';

const CompanyActivities = ({ activities }) => (
    <div>
        <h2>Company Activities</h2>
        <pre>{JSON.stringify(activities, null, 2)}</pre>
    </div>
);

export default CompanyActivities;