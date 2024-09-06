import { Injectable, Logger } from '@nestjs/common'
import { UserRepository } from 'src/persistence/repositories/user.repository'
import { UserEntity } from './entities/user.entity'
import { IUserUpdate } from './interfaces/IUserUpdate'
import { IUserCreate } from './interfaces/IUserCreate'

@Injectable()
export class UserDomainService {
  private readonly logger = new Logger(UserDomainService.name)
  constructor(
		private userRepository: UserRepository
	) {}

	async create(data: IUserCreate) {
		return await this.userRepository.create(data)
	}

	async findById(userId: string) {
		return await this.userRepository.findById(userId)
	}

	async findByIdWithCourier(userId: string) {
		return await this.userRepository.findByIdWithCourier(userId)
	}

	async findUserWithEmail(email: string) {
		return await this.userRepository.findUserWithEmail(email)
	}

	async findByEmail(email: string) {
		return await this.userRepository.findByEmail(email)
	}

	async updateMe(user: UserEntity, data: IUserUpdate) {
		return this.userRepository.updateById(user.id, data)
	}

	async deleteMe(user: UserEntity) {
		return this.userRepository.deleteById(user.id)
	}
}
