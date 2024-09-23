'use client';

import {
  Button,
  Card,
  FieldGroup,
  Inline,
  MarigoldProvider,
  OverlayContainerProvider,
  Select,
  Stack,
  TextField,
} from '@/ui';
import { BlurFade } from '@/ui/BlurFade';
import { useThemeSwitch } from '@/ui/ThemeSwitch';

export const SystemSection = () => {
  const { current, themes, updateTheme } = useThemeSwitch();
  const theme = themes[current];

  return (
    <BlurFade className="col-span-3" inView inViewMargin="-100px">
      <Card variant="content" p={0}>
        <div className="absolute left-4 top-3 flex flex-wrap gap-2">
          <Select
            label="Theme"
            variant="floating"
            size="small"
            width={32}
            selectedKey={current}
            onChange={next => updateTheme(next)}
          >
            {Object.keys(themes).map(name => (
              <Select.Option key={name} id={name}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div data-theme={current}>
          <OverlayContainerProvider value="portalContainer">
            <MarigoldProvider theme={theme}>
              <div className="flex size-full min-h-56 items-center justify-center overflow-x-auto px-4 pb-8 pt-16">
                <FieldGroup
                  labelWidth={current === 'core' ? '75px' : undefined}
                >
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
                </FieldGroup>
              </div>
            </MarigoldProvider>
          </OverlayContainerProvider>
        </div>
      </Card>
    </BlurFade>
  );
};
