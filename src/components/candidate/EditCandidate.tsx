import React, { ChangeEvent, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Pencil, User2Icon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import FormSubmitBtn from "../common/FormSubmitBtn";
import { useForm } from "react-hook-form";
import {
  EditCandidateSchema,
  TAddCandidate,
  TEditCandidate,
} from "@/schemas/candidate.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditCandidateMutation } from "@/hooks/candidate.hooks";
import toast from "react-hot-toast";

export default function EditCandidate({ candidate }: { candidate: any }) {
  const { mutateAsync, isPending } = useEditCandidateMutation();
  const [open, setOpen] = useState(false);
  const [imageLink, setImageLink] = useState(candidate.pic.secureUrl);
  const [imgFile, setImgFile] = useState<File | string | null | any>(null);
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TEditCandidate>({
    resolver: zodResolver(EditCandidateSchema),
  });

  useEffect(() => {
    trigger("pic");
    setValue("pic", candidate.pic);
  }, []);

  const handleUploadImageClick = () => {
    (document?.getElementById("candidateImage") as HTMLInputElement).click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImgFile(file);
      // trigger("pic");
      // setValue("pic", file);
      setImageLink(imageURL);
    }
  };

  const onSubmit = async (data: TEditCandidate) => {
    // IF USER CHANGES THE PICTURE
    if (imgFile) {
      console.log("IMAGE CHANGE");

      const fd = new FormData();
      console.log("IMAGE UPLOAD VO:", imgFile);

      fd.append("fullname", data.fullname);
      fd.append("age", data.age);
      fd.append("party", data.party);
      fd.append("pic", imgFile);

      mutateAsync({ payload: fd, id: candidate._id })
        .then(async (res) => {
          console.log("REs k xa EDIT ko with pic change :", res);
          toast.success("Candidate Updated!");
          setOpen(false);
        })
        .catch((err) => {
          console.log(" ERRORR:", err);
          toast.error(err.message);
        });
    } else {
      console.log("IMAG notE CHANGE");

      const fd = new FormData();
      console.log("IMAGE UPLOAD VO:", imgFile);

      fd.append("fullname", data.fullname);
      fd.append("age", data.age);
      fd.append("party", data.party);

      mutateAsync({ payload: fd, id: candidate._id })
        .then(async (res) => {
          console.log("REs k xa EDIT without pic chnage ko :", res);
          toast.success("Candidate Updated!");
          setOpen(false);
        })
        .catch((err) => {
          console.log(" ERRORR:", err);
          toast.error(err.message);
        });
    }
    // Here you would typically handle the login logic
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            // onClick={() => handleEditCandidate(candidate._id)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Candidate</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* PHOTO UPLOAD */}
            <div className=" text-center  flex flex-col  items-center">
              <input
                {...register("pic")}
                type="file"
                name="image"
                id="candidateImage"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="w-[150px] h-[150px] rounded-full border border-[#e5eaf2] flex items-center justify-center">
                {imageLink === "" ? (
                  <User2Icon
                    size={90}
                    strokeWidth={2}
                    className="text-[10rem] text-[#e5eaf2]"
                  />
                ) : (
                  <img
                    src={imageLink}
                    alt="image"
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </div>
              {errors.pic && (
                <p className="text-red-500 text-xs mt-1">
                  {typeof errors.pic.message === "string"
                    ? errors.pic.message
                    : ""}
                </p>
              )}

              <Button
                type="button"
                className="px-4 py-2  text-white rounded-md mt-5"
                onClick={handleUploadImageClick}
              >
                Upload profile
              </Button>
            </div>

            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                {...register("fullname")}
                defaultValue={candidate?.fullname}
              />
              {errors.fullname && (
                <p className="text-red-300 text-xs mt-1">
                  {errors.fullname.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="edit-email">Party</Label>
              <Input
                id="edit-email"
                {...register("party")}
                defaultValue={candidate?.party}
              />
              {errors.party && (
                <p className="text-red-300 text-xs mt-1">
                  {errors.party.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="edit-position">Age</Label>
              <Input
                id="edit-position"
                {...register("age")}
                defaultValue={candidate?.age}
              />
              {errors.age && (
                <p className="text-red-300 text-xs mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>
            <FormSubmitBtn isLoading={isPending}>Edit Candidate</FormSubmitBtn>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
