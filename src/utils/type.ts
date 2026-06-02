export const role = ["contributor","maintainer"] as const;
export type Role = typeof role[number];
export type TypeIssues = "bug" | "feature_request";
export type Status = "open" | "in_progress" | "resolved";

export type  User ={
    id:number,
    name:string,
    email:string,
    password:string,
    role:Role,
    created_at:Date,
    updated_at:Date
}

export type RUser = Omit<User,  "created_at" | "updated_at" | "password">


export type Issues ={
    id:number,
    title:string,
    description:string,
    type:TypeIssues,
    status:Status, 
    reporter_id:number,
    created_at:Date,
    updated_at:Date
}

export type Rissues = Omit<Issues, "updated_at" | "created_at"> 


export type IssuesUserData = {
  id: number;
  title: string;
  description: string;
  type: TypeIssues;
  status: Status;
  created_at: Date;
  updated_at: Date;
  reporter_id: number;
  reporter_name: string;
    reporter_role: Role;
    
}






