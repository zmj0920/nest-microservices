import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemService } from './system.service';


@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

}
