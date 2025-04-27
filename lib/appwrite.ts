import { Client, Storage, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("680df3b8001c2f17bbc6");

const storage = new Storage(client);

export { client, storage, ID };
