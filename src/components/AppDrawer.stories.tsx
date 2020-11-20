import { AppDrawer, AppDrawerProps } from "./AppDrawer";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";

import React from "react";

export default {
  title: "Example/AppDrawer",
  component: AppDrawer,
} as Meta;

const Template: Story<AppDrawerProps> = (args) => <AppDrawer {...args} />;

export const Default = Template.bind({});
Default.args = {};
