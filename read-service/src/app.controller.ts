import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':code')
  @Redirect('', 302)
  getUrl(@Param('code') shortCode: string): Promise<{ url: string }> {
    return this.appService.getUrl(shortCode);
  }
}
