import { useState } from "react";

function Tabs(props) {
  const [openedTab, setOpenedTab] = useState(1);

  const totalTabs = props.children.length;
  // 1. render out the number of tabs dynamically
  const tabButtons = props.children.map((child, index) => {
    const isActive = openedTab === index + 1;
    const isFirstTab = index === 0;
    const isLastTab = index === totalTabs - 1;

    return (
      <li className="w-1/2" key={index}>
        <button
          className={`inline-block w-full p-4 outline-none transition-all duration-300 ease-in-out ${
            isActive
              ? "text-white bg-neutral active"
              : "text-neutral bg-base-100 hover:bg-base-200"
          } ${isFirstTab ? "rounded-l-lg" : ""} ${
            isLastTab ? "rounded-r-lg" : ""
          }`}
          onClick={() => setOpenedTab(index + 1)}
        >
          {child.props.tabLabel}
        </button>
      </li>
    );
  });

  // 2. render out the content associated with the particular tab dynamically
  const tabContents = props.children.map((child, index) => (
    <div className={openedTab === index + 1 ? "block" : "hidden"} key={index}>
      {child.props.children}
    </div>
  ));

  return (
    <>
      {/* 3. the dynamically generated tabs are rendered in a <ul> component */}
      <ul className="text-sm font-medium text-center rounded-lg shadow-md flex flex-nowrap w-full">
        {tabButtons}
      </ul>
      {/* 4. the dynamically generated contents are rendered out in a <div> component */}
      <div className="mt-2  w-full xl:max-h-[180px] xl:overflow-y-scroll">
        {tabContents}
      </div>
    </>
  );
}

// defining a Tab component that represents indiviudal tab content
function Tab(props) {
  return <>{props.children}</>;
}

// attach the Tab component to the Tabs component for easier usage (gptkorkor teach me this)
Tabs.Tab = Tab;

export default Tabs;
