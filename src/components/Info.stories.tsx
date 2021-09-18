import { Meta, Story } from "@storybook/react";

import photo from "../stories/assets/photo.jpg";
import { Toilet } from "../Toilet";
import toilets from "../toilets.json";
import { Info, InfoProps } from "./Info";

export default {
  title: "Example/Info",
  component: Info,
} as Meta;

const Template: Story<InfoProps> = (args) => (
  <div style={{ width: "480px", border: "1px solid grey" }}>
    <Info {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  toilet: toilets[10] as Toilet,
  getDetails: (_request: any, callback: any) => {
    callback(
      {
        opening_hours: { weekday_text: ["Monday: 9am - 6pm"] },
        photos: [{ getUrl: () => photo }],
      },
      google.maps.places.PlacesServiceStatus.OK
    );
  },
};

export const Yellow = Template.bind({});
Yellow.args = {
  toilet: { ...(toilets[10] as Toilet), equipment_standard: "Yellow"},
  getDetails: (_request: any, callback: any) => {
    callback(
      {
        opening_hours: { weekday_text: ["Monday: 9am - 6pm"] },
        photos: [{ getUrl: () => photo }],
      },
      google.maps.places.PlacesServiceStatus.OK
    );
  },
};

export const NoPhotoFound = Template.bind({});
NoPhotoFound.args = {
  toilet: toilets[10] as Toilet,
  getDetails: (_request: any, callback: any) => {
    callback(
      {
        opening_hours: { weekday_text: ["Monday: 9am - 6pm"] },
        photos: [],
      },
      google.maps.places.PlacesServiceStatus.OK
    );
  },
};
