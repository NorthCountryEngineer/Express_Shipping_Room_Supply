import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class InventoryEventsController {
  private readonly logger = new Logger(InventoryEventsController.name);

  @MessagePattern('InventoryReserved')
  handleReserved(@Payload() message: any) {
    this.logger.log(`InventoryReserved: ${JSON.stringify(message)}`);
  }

  @MessagePattern('InventoryFailed')
  handleFailed(@Payload() message: any) {
    this.logger.log(`InventoryFailed: ${JSON.stringify(message)}`);
  }
}
