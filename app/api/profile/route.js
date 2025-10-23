// app/api/profile/route.js
import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(request) {
  try {
    const userId = getUserFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const users = await getCollection('users');
    const user = await users.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        profile: user.profile,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const userId = getUserFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { bio, avatar } = await request.json();

    const users = await getCollection('users');
    const updateData = {};

    if (bio !== undefined) {
      updateData['profile.bio'] = bio;
    }

    if (avatar !== undefined) {
      updateData['profile.avatar'] = avatar;
    }

    const result = await users.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Profile PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
