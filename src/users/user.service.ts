import {
	Inject,
	Injectable
} from '@nestjs/common';

import { RegisterSafeRequestDto } from 'src/auth/dto/register.request';
import User from 'src/database/models/user.entity';

@Injectable()
export class UsersService {

	constructor(
		@Inject("UserRepository")
		private readonly repo: typeof User,
	) {}

	async createUser(
		userData: RegisterSafeRequestDto,
	) {
		const user = await this.repo.create({
			name: userData.name,
			email: userData.email,
			phone: userData.phone,
			password: userData.hashedPassword,
		})
		await user.save()
	}

	async findOneByEmail(
		email: string,
	) {
		return await this.repo.findOne({where:{email}})
	}

	async findOneByPhone(phone:string) {
		return await this.repo.findOne({where:{phone}})
	}

	
}
