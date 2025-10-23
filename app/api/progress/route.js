// app/api/progress/route.js
import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function POST(request) {
  try {
    const userId = getUserFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { storyId, endingId, choices, stats } = await request.json();

    const users = await getCollection('users');
    
    // Update user stats
    const updateData = {
      $inc: {
        'profile.stats.totalChoices': choices ? choices.length : 0
      },
      $addToSet: {}
    };

    if (endingId) {
      updateData.$addToSet['profile.stats.endingsUnlocked'] = `${storyId}-${endingId}`;
      updateData.$inc['profile.stats.storiesFinished'] = 1;
    }

    const result = await users.updateOne(
      { _id: new ObjectId(userId) },
      updateData
    );

    // Save progress to separate collection
    const progress = await getCollection('progress');
    await progress.insertOne({
      userId: new ObjectId(userId),
      storyId,
      endingId,
      choices,
      stats,
      completedAt: new Date()
    });

    return NextResponse.json({
      success: true,
      message: 'Progress saved'
    });

  } catch (error) {
    console.error('Progress save error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const userId = getUserFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const progress = await getCollection('progress');
    const userProgress = await progress
      .find({ userId: new ObjectId(userId) })
      .sort({ completedAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({
      success: true,
      progress: userProgress
    });

  } catch (error) {
    console.error('Progress GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
