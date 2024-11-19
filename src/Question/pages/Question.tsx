import SelectComponent from "../../components/SelectComponent.tsx";

const Question = () => {
    // 2010 ~ 2024까지의 연도 배열
    const years = Array.from({ length: 15 }, (_, i) => 2010 + i);
    // 1 ~ 12까지의 월 배열
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <div>
            <form>
                <p>월별 질문 등록 횟수 조회</p>
                <select name="type" id="type">
                    <option value="question">질문</option>
                    <option value="comment">답변</option>
                </select>

                <SelectComponent
                    name="year"
                    id="year"
                    array={years}/>

                <SelectComponent
                    name="month"
                    id="month"
                    array={months}/>

                <button>검색</button>
            </form>
        </div>
    );
};

export default Question;