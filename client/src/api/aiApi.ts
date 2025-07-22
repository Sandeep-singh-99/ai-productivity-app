import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/lib/axiosClient";
import { AxiosError } from "axios";


interface IBlogResponse {
    id?: string,
    question: string;
    category: string;
    createdAt?: string;
    message?: string;
    success?: boolean;
}


interface IErrorResponse {
  message: string;
  success?: boolean;
}

export const useGenerateBlog = () => {
    const queryClient = useQueryClient();

    return useMutation<IBlogResponse, AxiosError<IErrorResponse>, { question: string; category: string }>({
        mutationFn: async ({ question, category }) => {
            const response = await axiosClient.post("/ai/blog-generate", { question, category }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
};


interface IArticleResponse {
    id?: string;
    question: string;
    createdAt?: string;
    message?: string;
    success?: boolean;
}

export const useGenerateArticle = () => {
    const queryClient = useQueryClient();

    return useMutation<IArticleResponse, AxiosError<IErrorResponse>, { question: string }>({
        mutationFn: async ({ question }) => {
            const response = await axiosClient.post("/ai/article-generate", { question }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] });
        },
    });
}