import * as ToiletsListStories from "./ToiletsList.stories";

// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";
import { Page, PageProps } from "./Page";

import React from "react";

export default {
  title: "Example/Page",
  component: Page,
  parameters: { layout: "fullscreen" },
} as Meta;

const Template: Story<PageProps> = (args) => (
  <div
    style={{
      height: "100vh",
      maxHeight: "1024px",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Page {...args} />
  </div>
);

export const Standard = Template.bind({});
Standard.args = {
  ...ToiletsListStories.Standard.args,
  position: { lat: 51.5074, lng: 0.1278 },
};
