import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { settingsSchema } from "@/lib/validation";
import { ObjectId } from "mongodb";

export async function GET() {
    try {
        const s = await requireRole(["owner", "manager", "waiter", "kitchen"]);
        const t = await (
            await db()
        )
            .collection("tenants")
            .findOne({ _id: new ObjectId(s.tenantId) });
        return NextResponse.json(t);
    } catch {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}

export async function PATCH(req: Request) {
    try {
        const s = await requireRole(["owner"]);
        const x = settingsSchema.parse(await req.json());
        await (
            await db()
        )
            .collection("tenants")
            .updateOne(
                { _id: new ObjectId(s.tenantId) },
                { $set: { ...x, updatedAt: new Date() } },
            );
        return NextResponse.json({ ok: true });
    } catch (e) {
        return NextResponse.json(
            { error: "Unable to update settings" },
            { status: 400 },
        );
    }
}
