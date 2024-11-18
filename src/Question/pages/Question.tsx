import React from 'react';
import {useQuery} from "@tanstack/react-query";
import QuestionCount from "../components/QuestionCount.tsx";
import CommentCount from "../components/CommentCount.tsx";
import api from "../../api/axios.ts";

const fetchQuestionCount = async () => {
    const response = await api.post('/api/v1/admin/post/question/count', {}); // 요청 바디를 추가할 경우 객체 삽입
    return response.data;
};

const fetchCommentCount = async () => {
    const response = await api.post('/api/v1/admin/post/comment/count', {}); // 요청 바디를 추가할 경우 객체 삽입
    return response.data;
};

const Question = () => {
    const {
        data: questionCount,
        error: questionError,
        isLoading: isLoadingQuestionCount
    } = useQuery({
        queryKey: ['questionCount'],
        queryFn: fetchQuestionCount,
    });

    const {
        data: commentCount,
        error: commentError,
        isLoading: isLoadingCommentCount
    } = useQuery({
        queryKey: ['commentCount'],
        queryFn: fetchCommentCount,
    });

    console.log(questionCount);
    console.log(commentCount);

    return (
        <div>
            <QuestionCount questionCount={questionCount} />
            <CommentCount commentCount={commentCount} />
        </div>
    );
};

export default Question;