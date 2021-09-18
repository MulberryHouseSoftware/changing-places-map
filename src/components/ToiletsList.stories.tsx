import { Meta, Story } from "@storybook/react";

import toilets from "../toilets.json";
import { ToiletsList, ToiletsListProps } from "./ToiletsList";

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
  selected: toilets[1].id,
};
