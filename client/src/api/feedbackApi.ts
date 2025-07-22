import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/lib/axiosClient";
import { AxiosError } from "axios";


interface IFeedbackResponse {
    id?: string,
    feedback: string;
    userId?: string;
    createdAt?: string;
    success?: boolean;
    message?: string;
}

interface IErrorResponse {
  message: string;
  success?: boolean;
}

export const useSubmitFeedback = () => {
    const queryClient = useQueryClient();

    return useMutation<IFeedbackResponse, AxiosError<IErrorResponse>, { feedback: string }>({
        mutationFn: async ({ feedback }) => {
            const response = await axiosClient.post("/feedback/create-feedback-form", { feedback }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feedback"] });
        },
    });
}