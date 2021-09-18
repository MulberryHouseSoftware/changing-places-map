import { Meta, Story } from "@storybook/react";

import { SearchBar, SearchBarProps } from "./SearchBar";

export default {
  title: "Example/SearchBar",
  component: SearchBar,
} as Meta;

const Template: Story<SearchBarProps> = (args) => <SearchBar {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  language: "en",
};
