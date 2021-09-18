import { Meta, Story } from "@storybook/react";

import toilets from "../toilets.json";
import { MapProps, ToiletMap } from "./Map";

export default {
  title: "Example/Map",
  component: ToiletMap,
} as Meta;

const Template: Story<MapProps> = (args) => (
  <div style={{ height: "80vh" }}>
    <ToiletMap {...args} />
  </div>
);

export const Standard = Template.bind({});
Standard.args = { toilets };
