// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";
import { ToiletListItem, ToiletListItemProps } from "./ToiletListItem";

import List from "@material-ui/core/List";
import React from "react";
import toilets from "../toilets.json";

export default {
  title: "Example/ToiletListItem",
  component: ToiletListItem,
} as Meta;

const Template: Story<ToiletListItemProps> = (args) => (
  <List>
    <ToiletListItem {...args} />
  </List>
);

export const Standard = Template.bind({});
Standard.args = {
  toilet: toilets[10],
};

export const Selected = Template.bind({});
Selected.args = {
  ...Standard.args,
  selected: true,
};
