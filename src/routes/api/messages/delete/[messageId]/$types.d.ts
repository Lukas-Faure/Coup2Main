import type { RequestEvent } from "@sveltejs/kit";

export type RequestHandler = (
  event: RequestEvent<{
    messageId: string;
  }>,
) => Response | Promise<Response>;
