import { Install, InstallProps } from "./Install";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";

import Dialog from "@material-ui/core/Dialog";
import React from "react";

export default {
  title: "Example/Install",
  component: Install,
} as Meta;

const Template: Story<InstallProps> = (args) => (
  <Dialog open>
    <Install {...args} />
  </Dialog>
);

export const Default = Template.bind({});
Default.args = {};
