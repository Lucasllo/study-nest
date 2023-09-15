/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";
import { UserDto } from './user.dto';

export class UserUpdatePartialDto extends PartialType(UserDto){

}