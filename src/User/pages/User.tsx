import React, {useState} from 'react';
import useFetchData from "../../hooks/useFetchData.ts";
import {ClockLoader} from "react-spinners";

const User = () => {
    const [inputValue, setInputValue] = useState(""); // 입력값 상태 관리
    const [dynamicUrl, setDynamicUrl] = useState<string | null>(null); // 동적 URL 상태 관리

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        console.log(inputValue)
        e.preventDefault(); // 기본 폼 동작 방지

        if (!inputValue.trim()) {
            alert("값을 입력하세요.");
            return;
        }

        // 동적 URL 업데이트
        setDynamicUrl(`/api/v1/admin/post/${inputValue}/question/top/user`);
        console.log(dynamicUrl);
    }

    const {
        data: userCompanyByCount,
        error: userCompanyByCountError,
        isLoading: isLoadingUserCompanyByCount,
    } = useFetchData(
        ['companyActivities', dynamicUrl],
        dynamicUrl || '/api/v1/admin/post/NAVER/question/top/user',
        "POST");

    if (isLoadingUserCompanyByCount) return <ClockLoader/>;
    if (userCompanyByCountError) return <div>Error occurred</div>;

    return (
        <div>
            {/* Navigation */}
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={handleInputChange}/>
                    <button>submit</button>
                </form>
            </div>

            {/* Contents */}
            <pre>{JSON.stringify(userCompanyByCount, null, 2)}</pre>
        </div>
    );
};

export default User;