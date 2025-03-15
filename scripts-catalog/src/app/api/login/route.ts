import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // Check if the password matches the environment variable
    if (password === process.env.ADMIN_PASSWORD) {
      // Return the admin token if the password is correct
      return NextResponse.json({ token: process.env.ADMIN_TOKEN }, { status: 200 });
    }

    // Return unauthorized if the password is incorrect
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 