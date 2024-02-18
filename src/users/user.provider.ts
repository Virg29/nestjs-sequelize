import { Provider } from "@nestjs/common";
import User from "src/database/models/user.entity";

export const UserProvider = { provide: 'UserRepository', useValue: User } as Provider;
