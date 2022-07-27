import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrivilegeService } from './privilege.service';


@Controller('privilege')
export class PrivilegeController {
  constructor(private readonly privilegeService: PrivilegeService) {}


}
