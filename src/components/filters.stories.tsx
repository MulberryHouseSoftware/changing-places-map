import { Filters, FiltersProps } from "./Filters";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";

import React from "react";

export default {
  title: "Example/Filters",
  component: Filters,
} as Meta;

const Template: Story<FiltersProps> = (args) => <Filters {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultChecked: [],
};
