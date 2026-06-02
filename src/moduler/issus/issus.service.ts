import { pool } from "../../DB";
import type { IssuesUserData, Rissues, RUser } from "../../utils/type";

class IssuesService {
    async issuesCreate(issues:Rissues, userId:number){
        const {title,description,type} = issues;
          const result = await pool.query(
    `
    INSERT INTO issues (title, description, type, reporter_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [title, description, type, userId]
  );
  return result.rows[0];
    }

    
async getAllUsers (query: any){
         const { sort = "newest", type, status } = query;

        let sql = `SELECT * FROM issues`;
        const conditions: string[] = [];
        const values: any[] = [];

  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  if (sort === "oldest") {
    sql += ` ORDER BY created_at ASC`;
  } else {
    sql += ` ORDER BY created_at DESC`;
  }

  const issuesResult = await pool.query(sql, values);

  const issues = issuesResult.rows;

  if (issues.length === 0) {
    return [];
  }

  const reporterIds = [
    ...new Set(issues.map((issue) => issue.reporter_id)),
  ];

  const usersResult = await pool.query(
    `SELECT id,name,role FROM users WHERE id = ANY($1)`,
    [reporterIds]
  );

  const users = usersResult.rows;

  const usersMap = new Map(
    users.map((user) => [user.id, user])
  );

  const formattedIssues = issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: usersMap.get(issue.reporter_id),
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  }));

  return formattedIssues;
    }

   

async getsingleIssue (issueId:string){
    const result = await pool.query(
    `
SELECT 
  issues.id,
  issues.title,
  issues.description,
  issues.type,
  issues.status,
  issues.created_at,
  issues.updated_at,
  users.id AS reporter_id,
  users.name AS reporter_name,
  users.role AS reporter_role
FROM issues
JOIN users ON issues.reporter_id = users.id
WHERE issues.id = $1;
        `
    , [issueId])

  const data = result.rows[0] as IssuesUserData
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    type: data.type,
    status: data.status,
    reporter: {
      id: data.reporter_id,
      name: data.reporter_name,
      role: data.reporter_role
    },
    created_at: data.created_at,
    updated_at: data.updated_at
  }
   } 


 async UpdateIssues(issueId: string, data: Partial<Rissues>, user:RUser){
     const { title, description, type } = data
  
 const issueRes = await pool.query(
    `SELECT * FROM issues WHERE id = $1`,
    [issueId]
  );

  const existingIssue = issueRes.rows[0];

  if (!existingIssue) return null;
  

  if (user.role === "contributor") {
    if (existingIssue.reporter_id !== user.id ||
      existingIssue.status !== "open") {
            throw new Error("Forbidden")
      }
  }

 const result = await pool.query(
    `
    UPDATE issues
    SET
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      type = COALESCE($3, type),
      updated_at = NOW()
    WHERE id = $4
    RETURNING *;
    `,
    [title ?? null, description ?? null, type ?? null, issueId]
  );
  return result.rows[0]
   }



   async deleteIssues(issueId:string){
  const result =await pool.query(
    `
    DELETE FROM issues
WHERE id =$1
  RETURNING *;
    `
    , [issueId])
  
  return result.rows[0]
}
}




export default new IssuesService