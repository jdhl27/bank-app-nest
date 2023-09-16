import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateClientDto {
  @Length(3, 20)
  @IsNotEmpty({ message: 'El nombre del cliente es obligatorio' })
  firstName: string;

  @Length(3, 20)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(13)
  phone: string;

  @IsNotEmpty()
  dni: string;
}
