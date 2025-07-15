import { json } from "@sveltejs/kit";
import type { Locals } from "@sveltejs/kit";

export async function authenticateUser(locals: Locals) {
    const session = await locals.auth();
    if (!session?.user?.id) {
        return {
            error: json({ error: "Non authentifié" }, { status: 401 }),
            userId: null
        };
    }
    return {
        error: null,
        userId: session.user.id
    };
} 