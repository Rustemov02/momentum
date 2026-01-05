// types/express.d.ts
import { User } from "../models/User";

declare global {
  namespace Express {
    interface User {
      id: string;
      googleId?: string;
      email?: string;
      name?: string;
    }

    interface Request {
      logout(done: (err: any) => void): void;
    }
  }
}

export {};
