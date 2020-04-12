import * as React from "react";
import { render } from "@testing-library/react";

import AddTrainingPage from "../index";
import { TrainingProps } from "../AddTrainingPage";

const nav: TrainingProps = {
  navigator: {}
};

test("<AddTrainingPage />", () => {
  it("should render a navbar", () => {
    const { getByText } = render(<AddTrainingPage navigator={nav} />);

    const navBarTitle = getByText("Add Training");

    expect(navBarTitle).toBeInTheDocument();
  });
});
