import express from "express";
import cookieParser from "cookie-parser"
import logger from "morgan"
const app = express();
const port = process.env.PORT || 3000;
import http from "http";

// Configuring the app
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Server test
app.get("/", (req: any, res: any) => {
	// send a simple json response
	res.json({ message: "Hello World!" });
});

const server = http.createServer(app);

server.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});

