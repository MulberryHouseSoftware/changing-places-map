import { Map, MapProps } from "./Map";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";

import React from "react";
import toilets from "../toilets.json";

export default {
  title: "Example/Map",
  component: Map,
} as Meta;

const Template: Story<MapProps> = (args) => (
  <div style={{ height: "80vh" }}>
    <Map {...args} />
  </div>
);

export const Standard = Template.bind({});
Standard.args = { toilets };
