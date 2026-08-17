const { createClient } = require("redis");

const client = createClient({
  url: "redis://localhost:6379"
});

client.on("error", (err) => console.log("Redis Error:", err));

async function connectRedis() {
  await client.connect();

  await client.set("name", "Pavan");

  const value = await client.get("name");

  console.log(value); // Pavan

    await client.quit();

}

connectRedis();