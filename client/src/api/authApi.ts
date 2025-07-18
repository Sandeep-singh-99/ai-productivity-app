import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

const API_URL = "http://localhost:5000/api/v1/user";

interface IAuthResponse {
  id: string;
  imageUrlId: string;
  imageUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  return useMutation<IAuthResponse, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(`${API_URL}/signUp`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return response.data;
    },
  });
};

export const useSignIn = () => {
  return useMutation<IAuthResponse, Error, FormData>({
    mutationFn: async (formData) => {
      const response = await axios.post(`${API_URL}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    },
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${API_URL}/logout`, {
        withCredentials: true,
      });
      return response.data;
    },
  });
};

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/checkAuth`, {
        withCredentials: true,
      });
      return response.data;
    },
    staleTime: 0,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
