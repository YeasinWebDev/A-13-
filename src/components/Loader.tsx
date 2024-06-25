import React from "react";

function Loader() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-purple-900"></div>
      </div>
    </div>
  );
}

export default Loader;
