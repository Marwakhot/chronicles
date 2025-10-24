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
    
    // Check if this is the first time starting this story
    const user = await users.findOne({ _id: new ObjectId(userId) });
    const progress = await getCollection('progress');
    const existingProgress = await progress.findOne({
      userId: new ObjectId(userId),
      storyId: storyId
    });

    const updateData = {
      $inc: {},
      $addToSet: {}
    };

    // If this is the first choice in a story, increment storiesStarted
    if (!existingProgress && choices.length === 0) {
      updateData.$inc['profile.stats.storiesStarted'] = 1;
    }

    // Increment totalChoices if there are new choices
    if (choices && choices.length > 0) {
      const previousChoiceCount = user.profile?.stats?.totalChoices || 0;
      updateData.$inc['profile.stats.totalChoices'] = choices.length;
    }

    // If there's an ending, add it and increment storiesFinished
    if (endingId) {
      const endingKey = `${storyId}-${endingId}`;
      
      // Check if this ending was already unlocked
      const alreadyUnlocked = user.profile?.stats?.endingsUnlocked?.includes(endingKey);
      
      if (!alreadyUnlocked) {
        updateData.$addToSet['profile.stats.endingsUnlocked'] = endingKey;
      }
      
      // Check if this story was already completed
      const alreadyCompleted = user.profile?.storiesCompleted?.includes(storyId);
      
      if (!alreadyCompleted) {
        updateData.$inc['profile.stats.storiesFinished'] = 1;
        updateData.$addToSet['profile.storiesCompleted'] = storyId;
      }
    }

    // Update user stats
    await users.updateOne(
      { _id: new ObjectId(userId) },
      updateData
    );

    // Save or update progress
    await progress.updateOne(
      {
        userId: new ObjectId(userId),
        storyId: storyId
      },
      {
        $set: {
          userId: new ObjectId(userId),
          storyId,
          endingId: endingId || null,
          choices,
          stats,
          lastUpdated: new Date(),
          completedAt: endingId ? new Date() : null
        }
      },
      { upsert: true }
    );

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
      .sort({ lastUpdated: -1 })
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
