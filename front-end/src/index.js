import React from "react";
import ReactDom from "react-dom";
import App from "./app.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";


ReactDom.render(<Router><App/></Router>, document.getElementById('app-root'))

