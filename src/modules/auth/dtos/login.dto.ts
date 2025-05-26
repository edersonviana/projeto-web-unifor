import { IsNotEmpty } from 'class-validator';

export class SignInDTO {
    @IsNotEmpty()
    matricula: string;
    
    @IsNotEmpty()
    senha: string;
}