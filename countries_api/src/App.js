import React from "react";
import Countries from "./component/Countries";

const App = () => {
  return (
    <div className="flex flex-col items-center bg-gray-300 ">
      <h1 className="text-2xl sm:text-3xl font-extrabold p-10 text-center w-[100%]">
        Country Single Page
      </h1>
      <Countries />
    </div>
  );
};

export default App;
