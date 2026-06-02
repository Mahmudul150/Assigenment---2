import { Router } from "express";
import { issuesControler } from "./issus.controler";
import { auth, authorizeRole } from "../../middleware";

const router = Router()

router.post('/',auth,authorizeRole('contributor','maintainer'), issuesControler.createIssues)
router.get('/',issuesControler.getIssues)
router.get('/:id',issuesControler.getSingelIssue)
router.put('/:id',auth, authorizeRole("maintainer", "contributor"),issuesControler.updateIssue)
router.delete('/:id',auth,authorizeRole("maintainer"),issuesControler.deleteIssue)
export const issueRouter = {
    router
}