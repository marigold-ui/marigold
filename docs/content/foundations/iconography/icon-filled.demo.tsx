import { DesignTicket } from '@marigold/icons';

export default () => (
  <div className="flex items-center gap-6">
    <DesignTicket />
    <DesignTicket fill="var(--color-destructive-accent)" />
    <DesignTicket
      fill="var(--color-destructive-accent)"
      stroke="var(--color-info-accent)"
    />
  </div>
);
