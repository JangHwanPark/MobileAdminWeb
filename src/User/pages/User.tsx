import {useState} from 'react';
import useFetchData from "../../hooks/useFetchData.ts";
import {ClockLoader} from "react-spinners";
import UserSearchForm from "../components/UserSearchForm.tsx";

type UserCompanyData = {
    company: string;
    question_cnt: number;
}[];

const User = () => {
    const [inputValue, setInputValue] = useState(""); // 입력값 상태 관리
    const [dynamicUrl, setDynamicUrl] = useState<string | null>(null); // 동적 URL 상태 관리

    const {
        data: userCompanyByCount,
        error: userCompanyByCountError,
        isLoading: isLoadingUserCompanyByCount,
    } = useFetchData<UserCompanyData>(
        ['companyActivities', dynamicUrl],
        dynamicUrl || '/api/v1/admin/post/NAVER/question/top/user',
        "POST");

    if (isLoadingUserCompanyByCount) return <ClockLoader/>;
    if (userCompanyByCountError) return <div>Error occurred</div>;

    return (
        <div>
            {/* Navigation */}
            <nav>
                <ul>
                    <li>사용자별 활동 통계</li>
                </ul>
            </nav>

            <UserSearchForm
                inputValue={inputValue}
                setInputValue={setInputValue}
                setDynamicUrl={setDynamicUrl}
                urlTemplate="/api/v1/admin/post/{input}/question/top/user"
            />

            {/* Contents */}
            {userCompanyByCount.map((item, index) => (
                <div key={index}>
                    <div>{item.company}</div>
                    <div>{item.question_cnt}</div>
                </div>
            ))}
        </div>
    );
};

export default User;