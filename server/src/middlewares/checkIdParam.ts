import type { Request, Response, NextFunction } from 'express';

export const checkIdParam = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (isNaN(Number(id))) {
        return res.status(400).json({ message: "L'ID doit être un nombre valide" });
    }
    next();
};