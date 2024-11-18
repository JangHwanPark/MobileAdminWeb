import React from 'react';
import useFetchData from "../../hooks/useFetchData.ts";
import {ClockLoader} from "react-spinners";

const User = () => {
    const {
        data: userCompanyByCount,
        error: userCompanyByCountError,
        isLoading: isLoadingUserCompanyByCount,
    } = useFetchData(
        ['companyActivities'],
        '/api/v1/admin/post/NAVER/question/top/user',
        "POST");

    if (isLoadingUserCompanyByCount) return <ClockLoader/>;
    if (userCompanyByCountError) return <div>Error occurred</div>;

    return (
        <div>
            {/* Navigation */}
            <div>
                <div>
                    <input type="text"/>
                    <button>submit</button>
                </div>
            </div>

            {/* Contents */}
            <pre>{JSON.stringify(userCompanyByCount, null, 2)}</pre>
        </div>
    );
};

export default User;