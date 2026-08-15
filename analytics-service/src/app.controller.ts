import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('url.visited')
  registerShortCodeUsed(@Payload() shortCode: string): Promise<void> {
    return this.appService.registerShortCodeUsed(shortCode);
  }
}
