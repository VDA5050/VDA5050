import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VDA5050",
  description:
    "Interface for the Communication between Mobile Robots and a Fleet Control. (Unofficial Korean translation)",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "VDA 5050 Spec", link: "/spec/" },
    ],

    sidebar: [
      {
        text: "JSON Schemas",
        items: [
          { text: "Order", link: "/schemas/order" },
          { text: "State", link: "/schemas/state" },
          { text: "Connection", link: "/schemas/connection" },
          { text: "Instant Actions", link: "/schemas/instantActions" },
          { text: "Factsheet", link: "/schemas/factsheet" },
          { text: "Visualization", link: "/schemas/visualization" },
          { text: "Responses", link: "/schemas/responses" },
          { text: "Zone Set", link: "/schemas/zoneSet" },
        ],
      },
      {
        text: "VDA 5050 Spec",
        items: [
          { text: "Overview", link: "/spec/" },
          { text: "0 Foreword", link: "/spec/0-foreword" },
          { text: "1 Introduction", link: "/spec/1-introduction" },
          { text: "2 Scope", link: "/spec/2-scope" },
          {
            text: "3 Definitions",
            items: [
              { text: "3.1 Mobile Robot", link: "/spec/3/3.1-1" },
              { text: "3.2 Moving", link: "/spec/3/3.2-2" },
              { text: "3.3 Driving", link: "/spec/3/3.3-3" },
              { text: "3.4 Automatic driving", link: "/spec/3/3.4-4" },
              { text: "3.5 Manual driving", link: "/spec/3/3.5-5" },
              {
                text: "3.6 Line-guided mobile robot",
                link: "/spec/3/3.6-6",
              },
              {
                text: "3.7 Freely navigating mobile robot",
                link: "/spec/3/3.7-7",
              },
            ],
          },
          {
            text: "4 Transport protocol",
            items: [
              { text: "4.0 Transport protocol", link: "/spec/4/4.0" },
              {
                text: "4.1 Connection handling, security and QoS",
                link: "/spec/4/4.1",
              },
              { text: "4.2 Topic levels", link: "/spec/4/4.2" },
              { text: "4.3 Topics for communication", link: "/spec/4/4.3" },
            ],
          },
          {
            text: "5 Process and content of communication",
            items: [
              { text: "5.1 General", link: "/spec/5/5.1" },
              { text: "5.2 Implementation Phase", link: "/spec/5/5.2" },
              {
                text: "5.3 Functions of the fleet control",
                link: "/spec/5/5.3",
              },
              {
                text: "5.4 Functions of the mobile robots",
                link: "/spec/5/5.4",
              },
            ],
          },
          {
            text: "6 Protocol specification",
            items: [
              { text: "6.1 Order", link: "/spec/6/6.1" },
              { text: "6.2 Actions", link: "/spec/6/6.2" },
              { text: "6.3 Maps", link: "/spec/6/6.3" },
              { text: "6.4 Zones", link: "/spec/6/6.4" },
              { text: "6.5 Connection", link: "/spec/6/6.5" },
              { text: "6.6 State", link: "/spec/6/6.6" },
              { text: "6.7 Visualization", link: "/spec/6/6.7" },
              {
                text: "6.8 Sharing planned paths",
                link: "/spec/6/6.8",
              },
              { text: "6.9 Request/response mechanism", link: "/spec/6/6.9" },
              { text: "6.10 Factsheet", link: "/spec/6/6.10" },
            ],
          },
          {
            text: "7 Message specification",
            items: [
              {
                text: "7.1 Symbols of the tables and meaning of formatting",
                link: "/spec/7/7.1",
              },
              { text: "7.2 Protocol header", link: "/spec/7/7.2" },
              { text: "7.3 Order message", link: "/spec/7/7.3" },
              { text: "7.4 InstantAction message", link: "/spec/7/7.4" },
              { text: "7.5 Response message", link: "/spec/7/7.5" },
              { text: "7.6 ZoneSet message", link: "/spec/7/7.6" },
              { text: "7.7 Connection message", link: "/spec/7/7.7" },
              { text: "7.8 State message", link: "/spec/7/7.8" },
              { text: "7.9 Visualization message", link: "/spec/7/7.9" },
              { text: "7.10 Factsheet message", link: "/spec/7/7.10" },
            ],
          },
          { text: "Bibliography", link: "/spec/bibliography" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/VDA5050/VDA5050" },
    ],
  },
});
