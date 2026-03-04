import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

export const useBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      // Pastikan endpoint sesuai Swagger, coba "/books" atau "/api/books"
      const response = await axiosInstance.get("/books");
      // Railway biasanya membungkus data dalam objek 'data'
      return response.data.data || response.data;
    },
  });
};
