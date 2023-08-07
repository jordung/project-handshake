import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import SetProfile from "./pages/SetProfile";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
} from "kbar";
import CreateProject from "./pages/CreateProject";

function App() {
  const actions = [];

  function RenderResults() {
    const { results } = useMatches();

    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) =>
          typeof item === "string" ? (
            <div className="px-3 py-3 font-medium text-gray-400 text-xs ">
              {item}
            </div>
          ) : (
            <div className="pb-[1px]">
              <div
                className={`${
                  active ? "bg-base-100" : "transparent"
                } px-4 py-2 rounded-lg mx-2 mb-1 flex text-neutral items-center cursor-pointer justify-between text-sm transition-all duration-300`}
              >
                <p>{item.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-[0.6rem] uppercase text-neutral font-normal">
                    {item.property}
                  </p>
                  {item.shortcut && (
                    <kbd
                      className={`kbd kbd-sm transition-all duration-300 ${
                        active
                          ? "bg-neutral text-white"
                          : "bg-secondary text-neutral"
                      }`}
                    >
                      {item.shortcut}
                    </kbd>
                  )}
                </div>
              </div>
            </div>
          )
        }
      />
    );
  }

  return (
    <div>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <KBarPositioner className="fixed backdrop-blur-sm flex items-start justify-center w-full inset-0 px-[14vh] py-[16px] box-border z-20">
            <KBarAnimator className="w-full max-w-[600px] overflow-hidden bg-white rounded-xl shadow-lg">
              <KBarSearch className="flex px-4 box-border m-0 w-full h-12 mb-3 border-b-base-100 border-b-[1px] text-sm outline-none" />
              <RenderResults />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
        <Routes>
          {/* Routes with Navbar */}
          <Route element={<Navbar />}>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/createProject" element={<CreateProject />} />
          </Route>

          {/* Routes without Navbar */}
          <Route path="/setprofile" element={<SetProfile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </KBarProvider>
    </div>
  );
}

export default App;
