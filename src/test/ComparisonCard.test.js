import React from "react";
import { ComparisonCard } from "../Components/ComparisonCard";

describe("ComparisonCard", () => {
  let shallowWrap;
  let mockDataOne = { "ACADEMY 20": 0.407, COLORADO: 0.53, compared: 0.768 };
  let mockDataTwo = { "ACADEMY 20": 0.7, COLORADO: 0.54, compared: 0.651 };

  beforeEach(() => {
    shallowWrap = shallow(<ComparisonCard comparisonData={mockDataOne} />);
  });

  it("should exist", () => {
    expect(shallowWrap).toBeDefined();
  });

  it("should match snapshot with no data", () => {
    shallowWrap = shallow(<ComparisonCard comparisonData={{}} />);
    expect(shallowWrap).toMatchSnapshot();
  });

  it("should match snapshot with first district avg greater than second district avg", () => {
    shallowWrap = shallow(<ComparisonCard comparisonData={mockDataTwo} />);
    expect(shallowWrap).toMatchSnapshot();
  });

  it("should match snapshot with second district avg greater than first district avg", () => {
    expect(shallowWrap).toMatchSnapshot();
  });
});
