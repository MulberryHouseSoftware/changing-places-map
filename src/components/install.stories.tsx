import Dialog from "@material-ui/core/Dialog";
import { Meta, Story } from "@storybook/react";

import { Install, InstallProps } from "./Install";

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
