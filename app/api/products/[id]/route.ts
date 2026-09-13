import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { productSchema } from "@/lib/validation";
import { ObjectId } from "mongodb";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const s = await requireRole(["owner", "manager"]);
        const x = productSchema.partial().parse(await req.json());
        const id = (await params).id;
        await (
            await db()
        )
            .collection("products")
            .updateOne(
                { _id: new ObjectId(id), tenantId: s.tenantId },
                { $set: { ...x, updatedAt: new Date() } },
            );
        return NextResponse.json({ ok: true });
    } catch (e) {
        return NextResponse.json(
            { error: "Unable to update product" },
            { status: 400 },
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const s = await requireRole(["owner", "manager"]);
        await (await db()).collection("products").deleteOne({
            _id: new ObjectId((await params).id),
            tenantId: s.tenantId,
        });
        return NextResponse.json({ ok: true });
    } catch (e) {
        return NextResponse.json(
            { error: "Unable to delete product" },
            { status: 400 },
        );
    }
}
