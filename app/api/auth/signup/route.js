// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const { email, password, username } = await request.json();

    if (!email || !password || !username) {
      return NextResponse.json(
        { error: 'Email, password, and username are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const users = await getCollection('users');
    const existingUser = await users.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email or username already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
      email,
      username,
      password: hashedPassword,
      createdAt: new Date(),
      profile: {
        avatar: null,
        bio: '',
        storiesCompleted: [],
        achievements: [],
        stats: {
          totalChoices: 0,
          storiesStarted: 0,
          storiesFinished: 0,
          endingsUnlocked: []
        }
      }
    };

    const result = await users.insertOne(newUser);

    const token = generateToken(result.insertedId.toString());

    // Return complete user object
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: result.insertedId.toString(),
        email: newUser.email,
        username: newUser.username,
        profile: newUser.profile,
        createdAt: newUser.createdAt
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
