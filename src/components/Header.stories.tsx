import { Meta, Story } from "@storybook/react";

import { Header, HeaderProps } from "./Header";

export default {
  title: "Example/Header",
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const NotInstallable = Template.bind({});
NotInstallable.args = {
  title: "Changing Places",
  language: "en",
};

export const Installable = Template.bind({});
Installable.args = {
  title: "Changing Places",
  language: "en",
  showInstallPromotion: true,
};
