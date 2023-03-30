import React from "react";

import {ListSection} from "./ListSection";
import {DataProvider} from "../store";

export default function App() {
  return (
    <>
      <div className="content">
        <DataProvider>
          <ListSection />
        </DataProvider>
      </div>
    </>
  );
}
