import { axiosInstance } from "@/libs/axios";
import { handleAxiosError } from "@/libs/error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetCandidatesQuery() {
  return useQuery({
    queryKey: ["candidates"],
    queryFn: async () => {
      return await axiosInstance.get("/candidate/countvotes");
    },
  });
}

export function useAddCandidateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: FormData) => {
      return await axiosInstance.post("/candidate/create", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError: (err) => {
      const errMsg = handleAxiosError(err);
      throw new Error(errMsg);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
  });
}

export function useEditCandidateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload, id }: { payload: FormData; id: string }) => {
      return await axiosInstance.put(`/candidate/edit/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError: (err) => {
      const errMsg = handleAxiosError(err);
      throw new Error(errMsg);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
  });
}

export function useDeleteCandidateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, publicId }: { id: string; publicId: string }) => {
      return await axiosInstance.delete(
        `/candidate/delete/${id}?publicId=${publicId}`
      );
    },
    onError: (err) => {
      const errMsg = handleAxiosError(err);
      throw new Error(errMsg);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
  });
}

export function useVoteCandidateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await axiosInstance.post(`/candidate/vote/${id}`);
    },
    onError: (err) => {
      const errMsg = handleAxiosError(err);
      throw new Error(errMsg);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
  });
}
