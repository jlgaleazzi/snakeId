import React from "react";
import ReactDom from "react-dom";
import App from "./app.js";
import { BrowserRouter as Router } from "react-router-dom";


ReactDom.render(<Router><App/></Router>, document.getElementById('app-root'))

