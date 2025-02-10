import { Router } from "express";
import { addCollege, collegeDetails, collegeList } from "../controllers/College.controller.js";

const router = Router()

router.route('/add').post(addCollege)
router.route('/list').post(collegeList)
router.route('/details').post(collegeDetails)


export default router;