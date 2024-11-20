import React from "react";

// Props 타입 정의
interface UserSearchFormProps {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    setDynamicUrl: React.Dispatch<React.SetStateAction<string | null>>;
    urlTemplate: string; // URL 템플릿
}

const UserSearchForm: React.FC<UserSearchFormProps> = ({inputValue, setInputValue, setDynamicUrl, urlTemplate}) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // 기본 폼 동작 방지

        if (!inputValue.trim()) {
            alert("값을 입력하세요.");
            return;
        }

        // 동적 URL 업데이트
        setDynamicUrl(urlTemplate.replace("{input}", inputValue)); // {input}을 inputValue로 대체
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleInputChange}
                    placeholder="검색어를 입력하세요"/>
                <button className="ml-5">검색</button>
            </form>
        </div>
    );
};

export default UserSearchForm;