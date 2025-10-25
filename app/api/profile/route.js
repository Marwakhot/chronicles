// app/api/profile/route.js - FIXED VERSION
import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function GET(request) {
  try {
    const userId = getUserFromRequest(request);
    console.log('Profile GET - userId:', userId);

    if (!userId) {
      console.log('Profile GET - No userId, returning 401');
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

    console.log('Profile GET - User found:', !!user);

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
    console.log('Profile PUT - userId:', userId);

    if (!userId) {
      console.log('Profile PUT - No userId, returning 401');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { bio, avatar } = await request.json();
    console.log('Profile PUT - bio:', bio);

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

    console.log('Profile PUT - Update result:', result.matchedCount);

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
