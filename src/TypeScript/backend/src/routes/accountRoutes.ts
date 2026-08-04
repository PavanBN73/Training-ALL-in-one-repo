import {Router} from "express";
const router = Router();

import { getAccounts } from "../controllers/accountController.js";

router.get("/",getAccounts);

export default router;