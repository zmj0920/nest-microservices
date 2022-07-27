import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserRoleService } from './user-role.service';


@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

}
