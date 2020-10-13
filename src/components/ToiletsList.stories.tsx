// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";
import { ToiletsList, ToiletsListProps } from "./ToiletsList";

import React from "react";
import toilets from "../toilets.json";

export default {
  title: "Example/ToiletsList",
  component: ToiletsList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<ToiletsListProps> = (args) => <ToiletsList {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  toilets,
};

export const Selected = Template.bind({});
Selected.args = {
  toilets: toilets.slice(0, 10),
  selected: toilets[1].name,
};
