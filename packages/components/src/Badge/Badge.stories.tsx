import React from "react";
import type { Meta, ComponentStory } from "@storybook/react";

import { Badge } from "./Badge";
import { Check } from "@marigold/icons";

export default {
  title: "Components/Badge",
  argTypes: {
    variant: {
      description: "badge variant",
      control: {
        type: "text",
      },
      defaultValue: "",
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Badge> = (args) => (
  <Badge {...args}>
    <Check /> Check
  </Badge>
);
