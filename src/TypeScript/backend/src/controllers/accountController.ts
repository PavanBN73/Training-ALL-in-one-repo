import type { Request, Response, NextFunction } from "express";

import { type Account } from "../models/accounts.js";
import AccountService from "../services/accountService.js";



function getAccounts(req: Request, res: Response, next: NextFunction) {

    const YashAcc: Account = {
        id: 123,
        name: "yash",
        age: 22,
        balance: 0
    };

    const accountService = new AccountService(YashAcc);

    res.json(accountService.getAccountInfo());

}

export { getAccounts };