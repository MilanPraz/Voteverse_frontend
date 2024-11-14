import { z } from "zod";
export const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10 MB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const AddCandidateSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required." }),
  age: z
    .string()
    .regex(/^\d+$/, { message: "Age must be a valid number" })
    .min(1, { message: "Age is required" }),
  party: z.string().min(1, { message: "Party is required" }),
  pic: z
    .any()
    .refine((file) => file !== null && file !== undefined, {
      message: "Image is required.",
    })
    .refine((file) => file?.size <= MAX_FILE_SIZE, {
      message: "Max file size is 10MB.",
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.type), {
      message: "Only .png, .jpg, .jpeg are supported.",
    }),
});
export const EditCandidateSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required." }),
  age: z
    .string()
    .regex(/^\d+$/, { message: "Age must be a valid number" })
    .min(1, { message: "Age is required" }),
  party: z.string().min(1, { message: "Party is required" }),
  pic: z.any(),
  // pic: z.object({
  //   publicId: z.string(),
  //   secureUrl: z.string(),
  // }),
});

export type TAddCandidate = z.infer<typeof AddCandidateSchema>;
export type TEditCandidate = z.infer<typeof EditCandidateSchema>;
