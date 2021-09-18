import List from "@material-ui/core/List";
import { Meta, Story } from "@storybook/react";

import toilets from "../toilets.json";
import { ToiletListItem, ToiletListItemProps } from "./ToiletListItem";

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
