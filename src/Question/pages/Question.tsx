import React from 'react';
import QuestionCount from "../components/QuestionCount.tsx";
import CommentCount from "../components/CommentCount.tsx";
import useFetchData from "../../hooks/useFetchData.ts";

type QuestionData = { question: string; count: number }[];

const Question = () => {
    const {
        data: questionCount,
        error: questionError,
        isLoading: isLoadingQuestionCount,
    } = useFetchData<QuestionData>(
        ['questionCount'],
        '/api/v1/admin/post/question/count',
        'POST');

    const {
        data: commentCount,
        error: commentError,
        isLoading: isLoadingCommentCount,
    } = useFetchData(
        ['commentCount'],
        '/api/v1/admin/post/comment/count',
        'POST');

    if (isLoadingQuestionCount || isLoadingCommentCount) return <div>Loading...</div>;
    if (questionError || commentError) return <div>Error occurred</div>;

    return (
        <div>
            <QuestionCount questionCount={questionCount || []} />
            <CommentCount commentCount={commentCount || []} />
        </div>
    );
};

export default Question;