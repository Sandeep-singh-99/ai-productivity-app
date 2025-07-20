import { useQuery, useMutation } from "@tanstack/react-query";
import axiosClient from "@/lib/axiosClient";
import { AxiosError } from "axios";

// interface IPlanResponse {
//   message?: string;
//   success?: boolean;
//   id: string;
//   planName: string;
//   price: number;
//   content: string[];
//   createdAt: string;
// }[]

interface IPlanResponse {
  message: string;
  success: boolean;
  id: string;
  planName: string;
  price: number;
  content: string[];
  createdAt: string;
}

interface IErrorResponse {
  message: string;
  success?: boolean;
}

export const useCreatePlan = () => {
  return useMutation<IPlanResponse, AxiosError<IErrorResponse>, FormData>({
    mutationFn: async (formData: FormData) => {
      const response = await axiosClient.post(
        "/plan/create-payment-plan",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
  });
};

export const useGetPlans = () => {
  return useQuery<IPlanResponse[]>({
    queryKey: ["plans"],
    queryFn: async () => {
      const response = await axiosClient.get("/plan/get-payment-plans", {
        withCredentials: true,
      });
      return response.data;
    },
  });
};
