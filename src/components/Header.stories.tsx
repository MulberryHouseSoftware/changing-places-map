import { Header, HeaderProps } from "./Header";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";

import React from "react";

export default {
  title: "Example/Header",
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const NotInstallable = Template.bind({});
NotInstallable.args = {
  title: "Changing Places",
  country: "GB",
};

export const Installable = Template.bind({});
Installable.args = {
  title: "Changing Places",
  country: "GB",
  showInstallPromotion: true,
};
