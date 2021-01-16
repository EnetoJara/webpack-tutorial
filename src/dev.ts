require("@babel/register");
require("core-js");
require("@babel/runtime-corejs3/regenerator");
require("es6-promise/auto");
import http from "http";
import express from "./express";

const app = express();
const server = http.createServer(app);


server.listen(Number(process.env.PORT), () => {
    console.log("App running en development");
    console.log("http://localhost:8080");

    console.log(process.env);

});
