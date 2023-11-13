import fastify from "fastify";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

const server = fastify({
  logger: {
    level: "info",
  },
});

server.register(jwt, {
  secret: "secret",
});

server.register(cors, {
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
});

server.get("/api/v1/linked-device/:code", async (request, reply) => {
  const query = request.params as { code: string };

  const linkedDevices = await prisma.linkedDevice.findFirst({
    where: {
      code: query.code,
    },
  });

  if (linkedDevices) {
    return reply.status(200).send({
      userId: linkedDevices.userId,
    });
  }

  reply.status(404).send({ error: "Not Found" });
});

server.post("/api/v1/decode", async (request, reply) => {
  const body = request.body as { token: string };
  const token = body.token;

  const decodeToken = await server.jwt.decode(token);

  reply.status(200).send(decodeToken);
});

server.post("/api/v1/linked-device/sign", async (request, reply) => {
  const codeGenerate = uuid();
  const body = request.body as {
    deviceName: string;
    browserName: string;
    fullBrowserVersion: string;
  };

  const token = await server.jwt.sign({
    code: codeGenerate,
    deviceName: body.deviceName,
    browserName: body.browserName,
    fullBrowserVersion: body.fullBrowserVersion,
  });

  reply.status(201).send({
    token,
    code: codeGenerate,
  });
});

server.post("/api/v1/linked-device", async (request, reply) => {
  const body = request.body as {
    code: string;
    userId: string;
    authToken: string;
    deviceName: string;
    browserName: string;
    fullBrowserVersion: string;
  };

  const consultLinkedDevice = await prisma.linkedDevice.findFirst({
    where: {
      userId: body.userId,
    },
  });

  const linkedDevice = await prisma.linkedDevice.upsert({
    create: {
      code: body.code,
      userId: body.userId,
      authToken: body.authToken,
      deviceName: body.deviceName,
      browserName: body.browserName,
      fullBrowserVersion: body.fullBrowserVersion,
    },
    update: {
      code: body.code,
      authToken: body.authToken,
      deviceName: body.deviceName,
      browserName: body.browserName,
      fullBrowserVersion: body.fullBrowserVersion,
    },
    where: {
      id: consultLinkedDevice?.id,
    },
  });

  reply.status(201).send(linkedDevice);
});

server.post("/api/v1/linked-device/user", async (request, reply) => {
  const body = request.body as {
    userId: string;
    deviceName: string;
    browserName: string;
    fullBrowserVersion: string;
  };

  const linkedDevices = await prisma.linkedDevice.findFirst({
    where: body,
  });

  if (linkedDevices) {
    return reply.status(200).send(linkedDevices);
  }

  reply.status(404).send({ error: "Not Found" });
});

server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server listening at ${address}`);
});
