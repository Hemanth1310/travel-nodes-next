"use server"
import { Prisma } from "@/generated/prisma/client"
import { getAuthUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NodeSchema } from "@/lib/typechecker"
import { mkdir } from "fs/promises"
import { writeFile } from 'fs/promises';
import path from "path"

 type Errors = {
        title: string,
        coordinates:string,
        content: string,
        visitDate:string, // validates "YYYY-MM-DD" string
        tags:string,
        image: string,
        uploadReq:string
 }

  const emptyErrors: Errors={
            title: "",
            coordinates: "",
            content: "",
            visitDate: "", // validates "YYYY-MM-DD" string
            tags: "",
            image: "",
            uploadReq:""
    }

type UploadActionType={
    error:Errors,
    success:boolean
}

export async function uploadAction(
    _prevState:UploadActionType,
    formData:FormData
):Promise<UploadActionType>{

    const user = await getAuthUser()
    if(!user){
       return ({
        error:{...emptyErrors,uploadReq:'User not found'},
        success:false
       })
    }

        const fileDetails = {
            ...Object.fromEntries(formData.entries()),
            // FormData flattens repeated keys when converted with Object.fromEntries.
            // Rebuild tags explicitly so z.array(tagSchema) receives string[].
            tags: formData.getAll("tags").filter((value): value is string => typeof value === "string"),
        }
    const parsedData = NodeSchema.safeParse(fileDetails)
    if(!parsedData.success){
        const issues: Errors = { ...emptyErrors }
        for(const issue of parsedData.error.issues){
           const field = issue.path[0];
            if (typeof field === "string" && field in emptyErrors) {
                   issues[field as keyof Errors] = issue.message;
            }
        }

        return {
            error:issues,
            success:false
        }
    }
    const {title, coordinates, content, visitDate, tags} = parsedData.data

    const file = parsedData.data.image

    if(!file || file.size === 0){
        return({
            error:{...emptyErrors,image:"Invalid File"},
            success:false
        })
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes)

    const folderPath = path.join(process.cwd(),'public/uploads')
    await mkdir(folderPath, { recursive: true })
    
    const uniqueFileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(folderPath, uniqueFileName);

    await writeFile(filePath,buffer)

    const publicUrl = `/uploads/${uniqueFileName}`;
    try{
        await prisma.node.create({
            data:{title, 
                coordinates, 
                content, 
                visitDate, 
                tags,
                imageUrl:publicUrl,
                userId:user.id
            }
        })
        return({error:emptyErrors,success:true})

    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
              if (err.code === "P2002") {
                return {
                  error: {
                    ...emptyErrors,
                    uploadReq: "A record already exists.",
                  },
                  success: false,
                };
              }
            }
            return {
              error: {
                ...emptyErrors,
               uploadReq: "Unexpected error occured",
              },
              success: false,
        };
    }

}