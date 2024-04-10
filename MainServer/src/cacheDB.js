import { createClient } from "redis"

const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();

export default client;

// 프로세스상에서 더이상 redis를 사용하지 않을때 사용하지, 일반적인 서버에서는 사용자하지 않는다.
// await client.disconnect(); 
