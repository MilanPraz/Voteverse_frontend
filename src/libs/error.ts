import { AxiosError } from "axios";

export function handleAxiosError(err: unknown): string {
  // console.log("AXIOS KO ERROR:", err);

  if (err instanceof AxiosError) {
    return err.response?.data?.message || "An unexpected error occurred";
  } else if (err instanceof Error) {
    return err.message || "An unexpected error occurred";
  }
  return "An unknown error occurred";
}
