import { Meta, Story } from "@storybook/react";

import toilets from "../toilets.json";
import { Filters, FiltersProps } from "./Filters";

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
