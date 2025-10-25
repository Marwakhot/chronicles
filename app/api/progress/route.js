// app/api/progress/route.js - Fixed version with proper tracking
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
    const progress = await getCollection('progress');
    
    // Get current user data
    const user = await users.findOne({ _id: new ObjectId(userId) });
    
    // Check if this is the first time starting this story
    const existingProgress = await progress.findOne({
      userId: new ObjectId(userId),
      storyId: storyId
    });

    const updateData = {
      $inc: {},
      $addToSet: {}
    };

    // If this is the first time encountering this story, increment storiesStarted
    if (!existingProgress) {
      updateData.$inc['profile.stats.storiesStarted'] = 1;
    }

    // Always increment totalChoices by the number of NEW choices
    if (choices && choices.length > 0) {
      const previousChoiceCount = existingProgress?.choices?.length || 0;
      const newChoicesCount = choices.length - previousChoiceCount;
      if (newChoicesCount > 0) {
        updateData.$inc['profile.stats.totalChoices'] = newChoicesCount;
      }
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

    // Only update if there are changes
    if (Object.keys(updateData.$inc).length > 0 || Object.keys(updateData.$addToSet).length > 0) {
      await users.updateOne(
        { _id: new ObjectId(userId) },
        updateData
      );
    }

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

// Example story component integration pattern:
// 
// In each story component (AncientStory, MedievalStory, etc.), update the makeChoice function:
//
// const makeChoice = async (nextScene, choiceText, statChanges = {}) => {
//   const newChoices = [...choices, choiceText];
//   setChoices(newChoices);
//   updateStats(statChanges);
//   setCurrentScene(nextScene);
//   window.scrollTo({ top: 0, behavior: 'smooth' });
//   
//   if (isAuthenticated) {
//     const newStats = {
//       loyalty: Math.max(0, Math.min(100, stats.loyalty + (statChanges.loyalty || 0))),
//       morality: Math.max(0, Math.min(100, stats.morality + (statChanges.morality || 0))),
//       influence: Math.max(0, Math.min(100, stats.influence + (statChanges.influence || 0)))
//     };
//     const nextSceneData = scenes[nextScene];
//     if (nextSceneData?.isEnding) {
//       await saveProgress('ancient-caesar', nextScene, newChoices, newStats);
//     } else {
//       await saveProgress('ancient-caesar', null, newChoices, newStats);
//     }
//   }
// };
