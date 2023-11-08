import { dataSource } from 'src/config/typeorm';
import { UserEntity } from '../entities/user.entity';
import { RegistrationDTO } from '../dto/registration.DTO';
import { HttpException, HttpStatus } from '@nestjs/common';
import { hash } from 'bcrypt';

export class UserService {
  private userRepository = dataSource.getRepository(UserEntity);

  private validatePassword(password: string) {
    if (password.length < 8 || password.length > 14) {
      throw new HttpException(
        'Password must be between 8 and 14 characters',
        HttpStatus.CONFLICT,
      );
    }

    if (!/^[A-Za-z0-9.,:;?!+*%\-\<\>@\[\]\{\}/\\_$#]*$/.test(password)) {
      throw new HttpException(
        'Password must be composed only the letters А-z and symbols (. , : ; ? ! * + % - < > @ [ ] { } / \\ _ $ #)',
        HttpStatus.CONFLICT,
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
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
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
}
