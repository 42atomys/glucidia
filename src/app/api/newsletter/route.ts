import { PrismaClient } from '@prisma/client';
import { UUID } from 'crypto';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const data: {
    email: string;
    invitedBy: string;
    userAgent: string;
    ip: any;
  } = await request
    .json()
    .then((res) => res)
    .catch(() => ({}));

  const { email, invitedBy, userAgent, ip } = data;

  const ipData = await fetch(`https://ifconfig.co/json?ip=${ip}`)
    .then((res) => res.json() as {})
    .catch(() => ({}));
  // @ts-ignore
  delete ipData.user_agent;
  console.log(ipData);

  return await prisma.newsletters
    .create({
      data: {
        email,
        invitedBy,
        userAgent,
        ipData,
      },
      select: {
        email: true,
      },
    })
    .then((res) => {
      return NextResponse.json({ email: res.email });
    })
    .catch((err) => {
      return NextResponse.json({ error: err }, { status: 400 });
    });
};

export const DELETE = async (request: Request) => {
  const data: { id: UUID } = await request.json().catch(() => ({}));

  prisma.newsletters.delete({
    where: { id: data.id },
  });

  return NextResponse.json({ success: true });
};
