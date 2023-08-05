import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import SetProfile from "./pages/SetProfile";
import Error from "./pages/Error";
import Home from "./pages/Home";

import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
} from "kbar";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const actions = [];

  function RenderResults() {
    const { results } = useMatches();

    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) =>
          typeof item === "string" ? (
            <div className="px-4 pt-4 pb-2 font-medium text-gray-400 uppercase ">
              {item}
            </div>
          ) : (
            <div
              className={`${
                active
                  ? "bg-neutral text-white rounded-lg font-medium"
                  : "transparent text-gray-500"
              } 'rounded-lg px-4 py-2 flex items-center cursor-pointer justify-between text-sm `}
            >
              <p>{item.name}</p>
              <div className="flex items-center gap-2">
                <p
                  className={`font-medium text-[0.6rem] uppercase ${
                    active ? "text-secondary" : "text-neutral"
                  }`}
                >
                  {item.property}
                </p>
                <kbd
                  className={`kbd kbd-sm ${
                    active ? "bg-accent text-neutral" : "bg-neutral text-white"
                  }`}
                >
                  {item.shortcut}
                </kbd>
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
          <KBarPositioner className="p-2 backdrop-blur-sm flex items-center z-20">
            <KBarAnimator className=" w-full max-w-[600px] overflow-hidden min-h-[40vh] p-2 bg-white rounded-xl shadow-lg">
              <KBarSearch className="flex px-4 w-full h-10 mb-2 outline-none" />
              <RenderResults />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
        <Routes>
          {/* Routes with Navbar */}
          <Route element={<Navbar />}>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
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
