import { Queue } from "bullmq";
import redis from "../config/redis";

const emailQueue = new Queue(
    "emailQueue",
    {
        connection: redis as any,
    }
);

export default emailQueue;