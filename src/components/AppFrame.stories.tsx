import { Meta, Story } from "@storybook/react";

import { AppFrame, AppFrameProps } from "./AppFrame";
import * as ToiletsListStories from "./ToiletsList.stories";

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
