import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";
import Routes from "./routes/Routes";
import { GlobalStyle } from "./globalStyles/index";
import theme from "./globalStyles/theme";
import { OPEN_CHAT } from "./utils/queries";
import SingleChat from "./components/Message/SingleChat";

import firebase from './components/firebase';
const App = () => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false)

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
	})

  const { data: chatData } = useQuery(OPEN_CHAT);
  
  return firebaseInitialized !== false ?  (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes />
      {chatData.chat.visible && <SingleChat creator={chatData.chat.user} />}
    </ThemeProvider>
  ) : <div id="loader"></div>
};

export default App;
