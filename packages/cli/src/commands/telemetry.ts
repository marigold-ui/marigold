import pc from 'picocolors';
import { setTelemetryEnabled, telemetryStatus } from '../lib/telemetry.js';

export type TelemetrySubcommand = 'status' | 'enable' | 'disable';

export interface RunTelemetryOptions {
  subcommand: TelemetrySubcommand;
}

export const runTelemetry = (options: RunTelemetryOptions): string => {
  switch (options.subcommand) {
    case 'enable':
      setTelemetryEnabled(true);
      return pc.green('Telemetry enabled.') + '\n';
    case 'disable':
      setTelemetryEnabled(false);
      return pc.yellow('Telemetry disabled.') + '\n';
    case 'status': {
      const status = telemetryStatus();
      const label =
        status === 'enabled'
          ? pc.green('enabled')
          : status === 'disabled'
            ? pc.yellow('disabled')
            : status === 'ci-suppressed'
              ? pc.dim('suppressed (CI detected)')
              : pc.dim('suppressed (env variable)');
      return `Telemetry: ${label}\n`;
    }
  }
};
