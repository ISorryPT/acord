import { Hono } from "hono";
import { BlankSchema } from "hono/types";
import { Server } from "./types";
import { DurableObject } from "cloudflare:workers";
const app = new Hono<{ Bindings: Env }>();

const apiApp = new Hono<{ Bindings: Env }, BlankSchema, "/api">();

apiApp.get("/", (ctx) => {
    return ctx.json({ "api": true })
})

apiApp.get("/servers", async (ctx) => {
    const d1query = await ctx.env.DB
        .prepare("SELECT * FROM servers")
        .all<Server>();
    return ctx.json(d1query.results)
});

apiApp.post("/servers", async (ctx) => {
    const body = await ctx.req.json<{name: string}>;
    const d1Query = await ctx.env.DB
        .prepare("INERT INTO servers VALUES (?,? RETURNING *")
        .bind(crypto.randomUUID(), body.name)
        .all<Server>();

    return ctx.json(d1Query.results[0])
});


apiApp.post("/servers", async (ctx) => {
    const body = await ctx.req.json<{name: string}>;
    const d1Query = await ctx.env.DB
        .prepare("INERT INTO servers VALUES (?,? RETURNING *")
        .bind(crypto.randomUUID(), body.name)
        .all<Server>();

    return ctx.json(d1Query.results[0])
});





app.route("/api", apiApp);
export default app;

export class Channel extends DurableObject<Env>{
    
}
