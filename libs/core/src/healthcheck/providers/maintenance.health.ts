import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

@Injectable()
export class MaintenanceHealthIndicator extends HealthIndicator {
  private maintenanceMode = false;

  async isMaintenanceModeActivated(
    key: string
  ): Promise<HealthIndicatorResult> {
    if (!this.maintenanceMode) {
      return this.getStatus(key, true);
    }

    throw new HealthCheckError(
      'Maintenance Mode On',
      this.getStatus(key, false)
    );
  }
}
