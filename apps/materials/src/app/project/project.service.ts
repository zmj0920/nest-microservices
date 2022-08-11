import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './project.mysql.entity';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: Repository<Project>,
  ) {}

  saveAndUpdate(project) {
    const { id, ...params } = project;
    if (id) {
      const findProject = this.projectRepository.findOne(id);

      return this.projectRepository.save({ ...findProject, ...params });
    }
    return this.projectRepository.save(project);
  }

  findOne(id) {
    return this.projectRepository.findOne(id);
  }

  findAll() {
    return this.projectRepository.find();
  }
}
