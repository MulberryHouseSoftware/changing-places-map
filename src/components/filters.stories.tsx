import { Filters, FiltersProps } from "./Filters";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";

import React from "react";
import toilets from "../toilets.json";

export default {
  title: "Example/Filters",
  component: Filters,
} as Meta;

const Template: Story<FiltersProps> = (args) => <Filters {...args} />;

export const Default = Template.bind({});
Default.args = {
  toilets,
  filters: {
    category: {
      type: "multi-select",
      label: "Category",
      options: [...new Set(toilets.map((toilet) => toilet.category))],
    },
  },
  defaultChecked: {
    category: [],
  },
};
