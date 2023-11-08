import { dataSource } from 'src/config/typeorm';
import { UserEntity } from '../entities/user.entity';
import { RegistrationDTO } from '../dto/registration.DTO';
import { BadRequestException } from '@nestjs/common';
import { hash } from 'bcrypt';

export class UserService {
  private userRepository = dataSource.getRepository(UserEntity);

  getRepository() {
    return this.userRepository;
  }

  private validatePassword(password: string) {
    if (password.length < 8 || password.length > 14) {
      throw new BadRequestException(
        'Password must be between 8 and 14 characters',
      );
    }

    if (!/^[A-Za-z0-9.,:;?!+*%\-\<\>@\[\]\{\}/\\_$#]*$/.test(password)) {
      throw new BadRequestException(
        'Password must be composed only the letters А-z and symbols (. , : ; ? ! * + % - < > @ [ ] { } / \\ _ $ #)',
      );
    }
  }

  async registration(input: RegistrationDTO): Promise<UserEntity> {
    const { password, email } = input;

    this.validatePassword(password);

    const existUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (existUser) {
      throw new BadRequestException('User already exists');
    }

    const hashPassword = await UserService.generatePassword(password);

    return this.userRepository.save({
      email,
      password: hashPassword,
    });
  }

  static async generatePassword(plainPassword: string) {
    return hash(plainPassword, 10);
  }

  async findOneWhere(args: {
    email?: string;
    id?: string;
  }): Promise<UserEntity | null> {
    const { email, id } = args;

    if (!email && !id) {
      return null;
    }

    return this.userRepository.findOne({
      where: {
        email,
        id,
      },
    });
  }
}
