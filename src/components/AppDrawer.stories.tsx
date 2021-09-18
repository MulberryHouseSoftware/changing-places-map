import { Meta, Story } from "@storybook/react";

import { AppDrawer, AppDrawerProps } from "./AppDrawer";

export default {
  title: "Example/AppDrawer",
  component: AppDrawer,
} as Meta;

const Template: Story<AppDrawerProps> = (args) => <AppDrawer {...args} />;

export const Default = Template.bind({});
Default.args = {};
