import { test, expect } from "@playwright/experimental-ct-react";
import FileTree from "../pages/FileTree";

const files = [
  {
    name: "src",
    children: [
      {
        name: "index.js",
      },
      {
        name: "components",
        children: [
          {
            name: "Navigation.jsx",
          },
        ],
      },
    ],
  },
  {
    name: ".gitignore",
  },
];

test("tree should render", async ({ mount }) => {
  const component = await mount(<FileTree files={files} />);

  await expect(component).toContainText("Navigation.jsx");
});

test("tree should render", async ({ mount }) => {
  const component = await mount(<FileTree files={files} />);

  await expect(component).toContainText("Navigation.jsx");
});
