import { DefaultSession } from "@auth/core/types";

declare global {
  namespace App {
    interface Error {}
    interface Locals {
      session: DefaultSession | null;
      auth: () => Promise<DefaultSession | null>;
    }
    interface PageData {}
    interface Platform {}
  }
}

declare module "@auth/core/types" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    } & DefaultSession["user"];
  }
}

export {};
