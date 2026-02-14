import {type User} from "./src/model/user.model.js";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
