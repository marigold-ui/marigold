'use client';

import { ruiTheme } from '@/theme';
import {
  Button,
  Card,
  Inline,
  MarigoldProvider,
  OverlayContainerProvider,
  Select,
  Stack,
  TextField,
} from '@/ui';
import { BlurFade } from '@/ui/BlurFade';

export const SystemSection = () => {
  return (
    <BlurFade className="md:col-span-3" inView inViewMargin="-100px">
      <Card variant="content" p={0}>
        <div data-theme={ruiTheme.name}>
          <OverlayContainerProvider container="portalContainer">
            <MarigoldProvider theme={ruiTheme}>
              <div className="flex size-full min-h-56 items-center justify-center overflow-x-auto px-4 pt-16 pb-8">
                <Stack space={4}>
                  <TextField
                    label="Ticket Name"
                    defaultValue="Platinum Package"
                  />
                  <Select label="Ticket Type" defaultSelectedKey="vip">
                    <Select.Option id="general">
                      General Admission
                    </Select.Option>
                    <Select.Option id="vip">VIP</Select.Option>
                    <Select.Option id="student">Student</Select.Option>
                    <Select.Option id="early-bird">Early Bird</Select.Option>
                    <Select.Option id="group">Group</Select.Option>
                  </Select>
                  <Inline space={4} alignX="right">
                    <Button variant="primary">Save</Button>
                    <Button variant="secondary">Cancel</Button>
                  </Inline>
                </Stack>
              </div>
            </MarigoldProvider>
          </OverlayContainerProvider>
        </div>
      </Card>
    </BlurFade>
  );
};
