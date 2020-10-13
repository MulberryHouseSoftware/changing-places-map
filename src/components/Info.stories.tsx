import { Info, InfoProps } from "./Info";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";

import React from "react";
import { Toilet } from "../Toilet";
import toilets from "../toilets.json";

export default {
  title: "Example/Info",
  component: Info,
} as Meta;

const Template: Story<InfoProps> = (args) => <Info {...args} />;

export const Default = Template.bind({});
Default.args = {
  toilet: toilets[0] as Toilet,
};
