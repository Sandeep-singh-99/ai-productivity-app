import { useQuery, useMutation } from "@tanstack/react-query";
import axiosClient from "@/lib/axiosClient";

interface IPlanResponse {
  message: string;
  success: boolean;
  data: {
    _id: string;
    planName: string;
    price: number;
    content: string[];
    createdAt: string;
  };
}


export const useCreatePlan = () => {
    return useMutation<IPlanResponse, Error, FormData>({
        mutationFn: async (formData: FormData) => {
        const response = await axiosClient.post("/plan/create-payment-plan", formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
        },
    });
}

export const useGetPlans = () => {
    return useQuery<IPlanResponse[]>({
        queryKey: ["plans"],
        queryFn: async () => {
            const response = await axiosClient.get("/plan/get-payment-plans");
            return response.data;
        },
    });
};