import type { Request, Response } from "express";
import issusService from "./issus.service";
import { sendResponse } from "../../utils/globalErrorHandling";

const createIssues = async (req:Request,res:Response) =>{
    const userId = req.user.id

    const result = await issusService.issuesCreate(req.body ,userId)
    
      if (!result){
        return sendResponse(res, { message: "Failed to create issues", error: true }, 400);
      } 

   return sendResponse(res, { message: "Issue created successfully", data: result }, 200);
}


const getIssues = async (req:Request,res:Response)=>{
    const result = await issusService.getAllUsers(req.query)
    if (!result) return sendResponse(res, { message: "Failed to getAll issues", error: true }, 400);  
        

    sendResponse(res, { message: "Issues retrieved successfully", data: result }, 200);
}

 const getSingelIssue = async (req: Request, res: Response) => {
    const issueId = req.params.id as string;
    const result = await issusService.getsingleIssue (issueId)
    if (!result) return sendResponse(res, { message: "SingleIssue is not found", error: true }, 400);
    sendResponse(res, {"message":"Issue retrived successfully", data: result }, 200);

}


const updateIssue = async (req: Request, res: Response) => {
    const issueId = req.params.id as string;
    const data = req.body
    const result = await issusService.UpdateIssues(issueId, data, req.user)
    if (!result) return sendResponse(res, { message: "Issue not found", error: true }, 400);
    sendResponse(res, { "message": "Issue updated successfully", data: result }, 200);
}


 const deleteIssue = async (req: Request, res: Response) => {
    const issueId = req.params.id as string
    const result = await issusService.deleteIssues(issueId)
    if (!result) {
        sendResponse(res,{message:"Issue not found",error:true},400)
    }
    sendResponse(res,{message:"Issue deleted successfully"},200)
}

export const issuesControler ={
    createIssues,
    getIssues,
    getSingelIssue,
    updateIssue,
    deleteIssue
}