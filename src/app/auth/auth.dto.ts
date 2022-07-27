import { ApiProperty } from '@nestjs/swagger';

export class GitlabToken {
  access_token: string;
}

export class GetTokenByApplications {
  @ApiProperty({ example: '1ScpZZ7ANaeUOVQVHrpWNe444OZg0le3gO00hg8w0eTl' })
  code: string;
}
