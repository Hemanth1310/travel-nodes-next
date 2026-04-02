"use client";
import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";
import { uploadAction } from "./action";
import { ImageUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UploadForm = () => {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(uploadAction, {
    error: {
      title: "",
      coordinates: "",
      content: "",
      visitDate: "", // validates "YYYY-MM-DD" string
      tags: "",
      image: "",
      uploadReq: "",
    },
    success: false,
  });
  const [filelist, setFileList] = useState<FileList | null>(null);
  const [preview, setPreview] = useState<string>("");
  const tagOptions = ["View", "Experience", "Food"];
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFileList(files);
    if (files && files.length > 0) {
      setPreview(URL.createObjectURL(files[0]));
    }
  };

    useEffect(() => {
            if (state.success) {
                toast.success("Upload Successful!", { id: "register-success" })
                router.push("/login")
            }
    }, [state.success, router])
  return (
    <div className="h-full w-full flex flex-col sm:p-10">
      <h3 className="text-2xl flex items-center gap-2 pt-3 pb-3 font-bold">
        <ImageUp size={32} />
        Upload
      </h3>
      <form action={formAction} className="w-full h-full flex flex-col sm:flex-row gap-5 pt-3 pb-3">
        <div className="flex-1 h-full flex flex-col gap-5 items-center rounded-2xl">
          <label className="flex flex-col w-full h-full items-center justify-center border-2 border-dashed border-blue-500 rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer p-4">
            <input
              id="image"
              type="file"
              accept="image/*"
              name="image"
              className="hidden"
              onChange={handleFile}
            />
            <div className="text-center">
              <p className="text-lg font-medium text-gray-700">
                Click to select
              </p>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF</p>
            </div>
          </label>
          <div className="w-full flex flex-wrap gap-5">
            {preview && (
              <Image src={preview} width={100} height={50} alt="previews" />
            )}
             {state.error.image.length>0 && (
              <div className="text-sm font-light text-red-800 pl-2">
                {state.error.image}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 h-full flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label>Title</label>
            <input
              suppressHydrationWarning
              className="w-full  p-2 text-md border-2 rounded-2xl"
              name="title"
              type="text"
              placeholder="Enter title"
            />
            {state.error.title.length > 0 && (
              <div className="text-sm font-light text-red-800 pl-2">
                {state.error.title}
              </div>
            )}
          </div>
           <div className="flex flex-col gap-2">
            <label>Coordinates</label>
            <input
              suppressHydrationWarning
              className="w-full  p-2 text-md border-2 rounded-2xl"
              name="coordinates"
              type="text"
              placeholder="Enter location"
            />
            {state.error.coordinates.length > 0 && (
              <div className="text-sm font-light text-red-800 pl-2">
                {state.error.coordinates}
              </div>
            )}
          </div>
           <div className="flex flex-col gap-2">
            <label>Content</label>
            <input
              suppressHydrationWarning
              className="w-full  p-2 text-md border-2 rounded-2xl"
              name="content"
              type="text"
              placeholder="Enter Description"
            />
            {state.error.content.length > 0 && (
              <div className="text-sm font-light text-red-800 pl-2">
                {state.error.content}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label>Content</label>
            <input
              className="w-full  p-2 text-md border-2 rounded-2xl"
              name="visitDate"
              type="date"
              placeholder="Enter Date"
            />
            {state.error.visitDate.length > 0 && (
              <div className="text-sm font-light text-red-800 pl-2">
                {state.error.visitDate}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label>Tags</label>
            <select
              multiple
              className="w-full  p-2 text-md border-2 rounded-2xl"
              name="tags"
            >
                {tagOptions.map(tag=><option key={tag} value={tag}>{tag}</option>)}
            </select>
            {state.error.tags.length > 0 && (
              <div className="text-sm font-light text-red-800 pl-2">
                {state.error.tags}
              </div>
            )}
            </div>
            {state.error.uploadReq && (
              <div className="text-sm font-light text-red-800 pl-2">
                {state.error.uploadReq}
              </div>
            )}
             <Button disabled={isPending} variant='outline' type='submit' className='bg-blue-500 text-white transition-colors hover:bg-blue-600 hover:text-white data-[state=open]:bg-blue-700 data-[state=open]:text-white'>
                            {isPending ? 'Processing...' : 'Upload'}
            </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
