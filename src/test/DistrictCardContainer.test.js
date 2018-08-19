import React from "react";
import { DistrictCardContainer } from "../Components/DistrictCardContainer";

describe("DistrictCardContainer", () => {
  let shallowWrap;
  let mockDistrictsOne = [
    {
      location: "COLORADO",
      clicked: true,
      stats: {
        2004: 0.24,
        2005: 0.278
      }
    },
    {
      location: "ACADEMY 20",
      clicked: true,
      stats: {
        2004: 0.302,
        2005: 0.267
      }
    }
  ];

  let mockDistrictsTwo = [
    {
      location: "COLORADO",
      clicked: false,
      stats: {
        2004: 0.24,
        2005: 0.278
      }
    },
    {
      location: "ACADEMY 20",
      clicked: false,
      stats: {
        2004: 0.302,
        2005: 0.267
      }
    }
  ];

  beforeEach(() => {
    shallowWrap = shallow(
      <DistrictCardContainer
        districts={mockDistrictsOne}
        selectCard={jest.fn()}
      />
    );
  });

  it("should exist", () => {
    expect(shallowWrap).toBeDefined();
  });

  it("should increment counter for each Card that has clicked property equal to true", () => {
    let counter = shallowWrap.props().children.map(child => child[1])[1].props
      .counter;
    expect(counter).toEqual(2);
  });

  it("should match snap shot with an empty District Card container", () => {
    shallowWrap = shallow(
      <DistrictCardContainer districts={[]} selectCard={jest.fn()} />
    );
    expect(shallowWrap).toMatchSnapshot();
  });

  it("should match snapshot with an array of districts with not clicked property ", () => {
    shallowWrap = shallow(
      <DistrictCardContainer
        districts={mockDistrictsTwo}
        selectCard={jest.fn()}
      />
    );
    expect(shallowWrap).toMatchSnapshot();
  });

  it("should match snapshot with districts with clicked property", () => {
    expect(shallowWrap).toMatchSnapshot();
  });
});
