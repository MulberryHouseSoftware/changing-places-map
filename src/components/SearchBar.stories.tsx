// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";
import { SearchBar, SearchBarProps } from "./SearchBar";

import React from "react";

export default {
  title: "Example/SearchBar",
  component: SearchBar,
} as Meta;

const Template: Story<SearchBarProps> = (args) => <SearchBar {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  country: "GB",
};
