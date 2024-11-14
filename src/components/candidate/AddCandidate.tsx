import React, { ChangeEvent, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { PlusCircle, User2Icon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import FormSubmitBtn from "../common/FormSubmitBtn";
import { useForm } from "react-hook-form";
import { AddCandidateSchema, TAddCandidate } from "@/schemas/candidate.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddCandidateMutation } from "@/hooks/candidate.hooks";
import toast from "react-hot-toast";

export default function AddCandidate() {
  const { mutateAsync, isPending } = useAddCandidateMutation();
  const [open, setOpen] = useState(false);

  const [imageLink, setImageLink] = useState("");
  const [imgFile, setImgFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<TAddCandidate>({
    resolver: zodResolver(AddCandidateSchema),
  });

  const handleUploadImageClick = () => {
    (document?.getElementById("candidateImage") as HTMLInputElement).click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    // const file = e.target.files?.[0];

    console.log("FILE TREIGGERE");

    console.log("FORMERRRORSSSS:", errors);

    if (e.target.files) {
      const file = e.target.files[0];
      setValue("pic", file);
      trigger("pic");
      console.log("FILE TREIGGERE INSIDE");
      const imageURL = URL.createObjectURL(file);
      setImgFile(file);
      setImageLink(imageURL);
      console.log("PICCCCC:", getValues("pic"));
    }
  };

  const onSubmit = async (data: TAddCandidate) => {
    console.log("Login attempted with:", data);
    console.log("IMAGE FILE:", imgFile);

    const fd = new FormData();
    if (imgFile) {
      fd.append("fullname", data.fullname);
      fd.append("age", data.age);
      fd.append("party", data.party);
      fd.append("pic", imgFile);
      console.log(fd);
      // console.log({ ...fd });

      mutateAsync(fd)
        .then(async (res) => {
          console.log("REs k xa candidate add ko :", res);
          toast.success("Candidate Added!");
          setOpen(false);
        })
        .catch((err) => {
          console.log("LOGIN ERRORR:", err);
          toast.error(err.message);
        });
    }

    // Here you would typically handle the login logic
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Candidate
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Candidate</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* PHOTO UPLOAD */}
            <div className=" text-center  flex flex-col  items-center">
              <input
                {...register("pic")}
                type="file"
                name="pic"
                accept="image/*"
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
              <Label htmlFor="name">Full Name</Label>
              <Input {...register("fullname")} id="fullname" name="fullname" />
              {errors.fullname && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullname.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="party">Party / Group</Label>
              <Input {...register("party")} id="party" name="party" />
              {errors.party && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.party.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input {...register("age")} id="age" name="age" />
              {errors.age && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>
            <FormSubmitBtn isLoading={isPending}>Add Candidate</FormSubmitBtn>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
