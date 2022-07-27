import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolePrivilegeService } from './role-privilege.service';

@Controller('role-privilege')
export class RolePrivilegeController {
  constructor(private readonly rolePrivilegeService: RolePrivilegeService) {}

}
