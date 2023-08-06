import { Logger, Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {
  private readonly logger = new Logger(this.constructor.name);

  onModuleInit() {
    this.logger.log(`>>>> ${this.constructor.name} init <<<<`);
  }
}
