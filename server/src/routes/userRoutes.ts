import { Router } from 'express';
import * as userController from "../controllers/userController.js";
import { checkIdParam } from '../middlewares/checkIdParam.js';

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.delete("/:id", checkIdParam, userController.deleteUser);

export default router;