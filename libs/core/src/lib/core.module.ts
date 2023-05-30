import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {
  onModuleInit() {
    console.log(`${this.constructor.name} init`);
  }
}
