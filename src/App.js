import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import appRoutes from "./configs/routes";


function App() {
  const routes = useRoutes(appRoutes);

  return <Suspense>{routes}</Suspense>;
}

export default App;
