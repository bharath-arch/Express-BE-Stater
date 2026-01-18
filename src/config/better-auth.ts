import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../prisma/client";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite", // This will be adjusted by prisma adapter based on the client
    }),
    emailAndPassword: {
        enabled: true,
    },
    // For JWT/Session support, better-auth handled this with its session management
});
