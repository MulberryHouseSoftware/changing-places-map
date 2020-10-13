import { Header, HeaderProps } from "./Header";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";

import React from "react";

export default {
  title: "Example/Header",
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const NotInstalled = Template.bind({});
NotInstalled.args = {
  title: "Changing Places",
};

export const Installed = Template.bind({});
Installed.args = {
  title: "Changing Places",
  showInstallPromotion: true,
};
