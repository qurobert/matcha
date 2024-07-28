import express from "express";

const IndexRouter = express.Router();

IndexRouter.get("/", (req: any, res: any) => {
	// send a simple json response
	res.json({ message: "Hello World!" });
});

export default IndexRouter;