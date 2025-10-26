// app/api/comments/route.js - UPDATED WITH LIKE & REPLY
import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { ObjectId } from 'mongodb';

// GET comments for a specific story
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const storyId = searchParams.get('storyId');

    if (!storyId) {
      return NextResponse.json(
        { error: 'Story ID is required' },
        { status: 400 }
      );
    }

    const comments = await getCollection('comments');
    const storyComments = await comments
      .find({ storyId, parentId: null }) // Only get top-level comments
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    // Get replies for each comment
    const commentsWithReplies = await Promise.all(
      storyComments.map(async (comment) => {
        const replies = await comments
          .find({ parentId: comment._id.toString() })
          .sort({ createdAt: 1 })
          .toArray();
        
        return {
          ...comment,
          replies: replies
        };
      })
    );

    return NextResponse.json({
      success: true,
      comments: commentsWithReplies
    });

  } catch (error) {
    console.error('Comments GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST a new comment or reply
export async function POST(request) {
  try {
    const userId = getUserFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in to comment' },
        { status: 401 }
      );
    }

    const { storyId, comment, parentId } = await request.json();

    if (!storyId || !comment || comment.trim().length === 0) {
      return NextResponse.json(
        { error: 'Story ID and comment are required' },
        { status: 400 }
      );
    }

    if (comment.length > 500) {
      return NextResponse.json(
        { error: 'Comment must be 500 characters or less' },
        { status: 400 }
      );
    }

    // Get user info
    const users = await getCollection('users');
    const user = await users.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const comments = await getCollection('comments');
    const newComment = {
      storyId,
      userId: new ObjectId(userId),
      username: user.username,
      comment: comment.trim(),
      parentId: parentId || null,
      createdAt: new Date(),
      likes: 0,
      likedBy: []
    };

    const result = await comments.insertOne(newComment);

    return NextResponse.json({
      success: true,
      comment: {
        ...newComment,
        _id: result.insertedId
      }
    });

  } catch (error) {
    console.error('Comments POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE a comment (only by the author)
export async function DELETE(request) {
  try {
    const userId = getUserFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get('commentId');

    if (!commentId) {
      return NextResponse.json(
        { error: 'Comment ID is required' },
        { status: 400 }
      );
    }

    const comments = await getCollection('comments');
    const comment = await comments.findOne({ _id: new ObjectId(commentId) });

    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    // Check if user is the author
    if (comment.userId.toString() !== userId) {
      return NextResponse.json(
        { error: 'You can only delete your own comments' },
        { status: 403 }
      );
    }

    // Delete the comment and all its replies
    await comments.deleteOne({ _id: new ObjectId(commentId) });
    await comments.deleteMany({ parentId: commentId });

    return NextResponse.json({
      success: true,
      message: 'Comment deleted'
    });

  } catch (error) {
    console.error('Comments DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Toggle like on a comment
export async function PATCH(request) {
  try {
    const userId = getUserFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in to like comments' },
        { status: 401 }
      );
    }

    const { commentId } = await request.json();

    if (!commentId) {
      return NextResponse.json(
        { error: 'Comment ID is required' },
        { status: 400 }
      );
    }

    const comments = await getCollection('comments');
    const comment = await comments.findOne({ _id: new ObjectId(commentId) });

    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    // Check if user already liked the comment
    const hasLiked = comment.likedBy.includes(userId);

    if (hasLiked) {
      // Unlike - remove user from likedBy array
      await comments.updateOne(
        { _id: new ObjectId(commentId) },
        {
          $pull: { likedBy: userId },
          $inc: { likes: -1 }
        }
      );
    } else {
      // Like - add user to likedBy array
      await comments.updateOne(
        { _id: new ObjectId(commentId) },
        {
          $addToSet: { likedBy: userId },
          $inc: { likes: 1 }
        }
      );
    }

    // Get updated comment
    const updatedComment = await comments.findOne({ _id: new ObjectId(commentId) });

    return NextResponse.json({
      success: true,
      comment: updatedComment,
      liked: !hasLiked
    });

  } catch (error) {
    console.error('Comments PATCH error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
