import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Resource =
  | "stats"
  | "menu"
  | "services"
  | "panelists"
  | "testimonials"
  | "institutions"
  | "messages";

const models: Record<Resource, keyof typeof prisma> = {
  stats: "stat",
  menu: "menuItem",
  services: "service",
  panelists: "panelist",
  testimonials: "testimonial",
  institutions: "institution",
  messages: "contactMessage",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  const { resource } = await params;
  const model = models[resource as Resource];
  if (!model) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await (prisma[model] as any).findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(data);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resource } = await params;
  const model = models[resource as Resource];
  if (!model) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const item = await (prisma[model] as any).create({ data: body });
  return NextResponse.json(item);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resource } = await params;
  const model = models[resource as Resource];
  if (!model) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const { id, ...data } = body;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const item = await (prisma[model] as any).update({
    where: { id },
    data,
  });
  return NextResponse.json(item);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resource } = await params;
  const model = models[resource as Resource];
  if (!model) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await req.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma[model] as any).delete({ where: { id } });
  return NextResponse.json({ success: true });
}
