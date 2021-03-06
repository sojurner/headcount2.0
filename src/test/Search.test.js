import React from "react";
import Search from "../Components/Search";

describe("Search", () => {
  let shallowWrap;
  let mockSubmit = jest.fn();
  let mockSelect = jest.fn();
  let mockClear = jest.fn();
  let mockData = [
    {
      clicked: true,
      location: "ADAMS COUNTY 14",
      stats: { 2004: 0.24, 2005: 0.278, 2006: 0.337, 2007: 0.395 }
    },
    {
      clicked: true,
      location: "COLORADO",
      stats: { 2004: 0.24, 2005: 0.278, 2006: 0.337, 2007: 0.395 }
    }
  ];

  beforeEach(() => {
    shallowWrap = shallow(
      <Search
        selectedDistricts={mockData}
        handleSubmit={() => mockSubmit()}
        selectCard={e => mockSelect(e)}
        clearComparisons={() => mockClear()}
      />
    );
  });

  it("should exist", () => {
    expect(shallowWrap).toBeDefined;
  });

  it("should have default state properties", () => {
    expect(shallowWrap.state().districtInputOne).toEqual("");
    expect(shallowWrap.state().searchSuggestions).toEqual([]);
  });

  it("should handleChange; set State and call suggest method", () => {
    shallowWrap.instance().handleChange({ value: "COLORADO" });

    expect(shallowWrap.state().districtInputOne).toEqual("COLORADO");
  });

  it("should set state of Search suggestions based on userInput and clicked property", () => {
    shallowWrap.instance().handleChange({ value: "Colorado" });

    const result = [
      {
        clicked: false,
        location: "COLORADO",
        stats: {
          "2004": 0.24,
          "2005": 0.278,
          "2006": 0.337,
          "2007": 0.395,
          "2008": 0.536,
          "2009": 0.598,
          "2010": 0.64,
          "2011": 0.672,
          "2012": 0.695,
          "2013": 0.703,
          "2014": 0.741
        }
      },
      {
        clicked: false,
        location: "COLORADO SPRINGS 11",
        stats: {
          "2004": 0.069,
          "2005": 0.509,
          "2006": 0.638,
          "2007": 0.994,
          "2008": 0.992,
          "2009": 1,
          "2010": 0.993,
          "2011": 0.994,
          "2012": 0.993,
          "2013": 0.989,
          "2014": 0.994
        }
      },
      {
        clicked: true,
        location: "ADAMS COUNTY 14",
        stats: { "2004": 0.24, "2005": 0.278, "2006": 0.337, "2007": 0.395 }
      },
      {
        clicked: true,
        location: "COLORADO",
        stats: { "2004": 0.24, "2005": 0.278, "2006": 0.337, "2007": 0.395 }
      }
    ];

    shallowWrap.instance().suggestDistricts("Colorado");
    expect(shallowWrap.state().searchSuggestions).toEqual(result);
  });

  it("should send call handleSubmit in App", () => {
    shallowWrap.instance().searchDistrict("COLORADO");
    expect(mockSubmit).toHaveBeenCalled();
  });

  it("should render form container with input", () => {
    expect(shallowWrap.find("form").length).toEqual(1);
    expect(shallowWrap.find("input").length).toEqual(1);
  });

  it("should change state onChange of input field", () => {
    let eventOne = { target: { value: "Academy" } };
    let eventTwo = { target: { value: "Akron" } };

    let userInput = shallowWrap.find("input");
    userInput.simulate("change", eventOne);
    expect(shallowWrap.state().districtInputOne).toEqual("Academy");

    userInput.simulate("change", eventTwo);
    expect(shallowWrap.state().districtInputOne).toEqual("Akron");
  });

  it("should suggest districts based on user input", () => {
    let eventOne = { target: { value: "Acade" } };
    let eventTwo = { target: { value: "A" } };

    let mockSelect = jest.fn();
    let mockSubmit = jest.fn();
    let mockClear = jest.fn();

    let shallowWrap = shallow(
      <Search
        selectedDistricts={mockData}
        handleSubmit={mockSubmit}
        selectCard={mockSelect}
        clearComparisons={mockClear}
      />
    );

    expect(shallowWrap.state().searchSuggestions.length).toEqual(0);

    let userInput = shallowWrap.find("input");
    userInput.simulate("change", eventOne);

    let suggestionOne = shallowWrap.state().searchSuggestions;
    expect(suggestionOne.length).toEqual(3);

    userInput.simulate("change", eventTwo);

    let suggestionTwo = shallowWrap.state().searchSuggestions;
    expect(suggestionTwo.length).toEqual(122);
  });

  it("should clear input, invoke the handleSubmit method from state", () => {
    let mockSelect = jest.fn();
    let mockSubmit = jest.fn();
    let mockClear = jest.fn();

    let shallowWrap = shallow(
      <Search
        selectedDistricts={mockData}
        handleSubmit={mockSubmit}
        selectCard={mockSelect}
        clearComparisons={mockClear}
      />
    );

    shallowWrap.setState({ districtInputOne: "Denver" });
    expect(shallowWrap.state().districtInputOne).toEqual("Denver");

    shallowWrap.instance().clearInput();
    expect(shallowWrap.state().districtInputOne).toEqual("");

    shallowWrap.setState({ districtInputOne: "Denver" });
    expect(shallowWrap.state().districtInputOne).toEqual("Denver");

    shallowWrap.find("button").simulate("click");
    expect(mockClear).toHaveBeenCalled();
  });

  it("should search for specific district and invoke the handleSubmit Method from state", () => {
    shallowWrap.instance().searchDistrict("ACADEMY 20");
    expect(mockSubmit).toHaveBeenCalled();
  });

  it("should match snapshot", () => {
    shallowWrap = shallow(
      <Search
        selectedDistricts={[]}
        handleSubmit={jest.fn()}
        selectCard={jest.fn()}
        clearComparisons={jest.fn()}
      />
    );

    expect(shallowWrap).toMatchSnapshot();
  });

  it("should match snapshot", () => {
    shallowWrap.instance().searchDistrict;
    expect(shallowWrap).toMatchSnapshot();
  });
});
