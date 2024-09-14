import React, { useContext } from "react";
import { UserContext, UserProvider } from "./context/UserContext";
import Game from "./component/Game";
import Auth from "./component/Auth";

function AppContent() {
  console.log(useContext(UserContext));

  const { user } = React.useContext(UserContext);

  return user ? <Game /> : <Auth />;
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
