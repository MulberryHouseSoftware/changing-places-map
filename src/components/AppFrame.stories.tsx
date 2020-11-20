import * as ToiletsListStories from "./ToiletsList.stories";

import { AppFrame, AppFrameProps } from "./AppFrame";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";

import React from "react";

export default {
  title: "Example/AppFrame",
  component: AppFrame,
  parameters: { layout: "fullscreen" },
} as Meta;

const Template: Story<AppFrameProps> = (args) => (
  <div
    style={{
      height: "100vh",
      maxHeight: "1024px",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <AppFrame {...args} />
  </div>
);

export const Standard = Template.bind({});
Standard.args = {
  ...ToiletsListStories.Standard.args,
  position: { lat: 51.5074, lng: 0.1278 },
};
