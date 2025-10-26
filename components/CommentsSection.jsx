// components/CommentsSection.jsx - UPDATED WITH LIKE & REPLY
'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Trash2, User, Clock, Heart, Reply, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CommentsSection = ({ storyId, storyTitle }) => {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComments();
    const interval = setInterval(fetchComments, 10000);
    return () => clearInterval(interval);
  }, [storyId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?storyId=${storyId}`);
      const data = await response.json();
      
      if (data.success) {
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('Please sign in to comment');
      return;
    }

    if (newComment.trim().length === 0) {
      setError('Please enter a comment');
      return;
    }

    if (newComment.length > 500) {
      setError('Comment must be 500 characters or less');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          storyId,
          comment: newComment
        })
      });

      const data = await response.json();

      if (data.success) {
        setNewComment('');
        fetchComments();
      } else {
        setError(data.error || 'Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      setError('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId) => {
    if (!isAuthenticated) {
      setError('Please sign in to reply');
      return;
    }

    if (replyText.trim().length === 0) {
      setError('Please enter a reply');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          storyId,
          comment: replyText,
          parentId
        })
      });

      const data = await response.json();

      if (data.success) {
        setReplyText('');
        setReplyingTo(null);
        fetchComments();
        // Expand the parent comment to show new reply
        setExpandedComments(prev => new Set([...prev, parentId]));
      } else {
        setError(data.error || 'Failed to post reply');
      }
    } catch (error) {
      console.error('Error posting reply:', error);
      setError('Failed to post reply');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId) => {
    if (!isAuthenticated) {
      setError('Please sign in to like comments');
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/comments', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ commentId })
      });

      const data = await response.json();

      if (data.success) {
        fetchComments();
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/comments?commentId=${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        fetchComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const toggleReplies = (commentId) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const CommentItem = ({ comment, isReply = false }) => {
    const hasLiked = user && comment.likedBy?.includes(user.id);
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isExpanded = expandedComments.has(comment._id.toString());

    return (
      <div className={`${isReply ? 'ml-12 mt-3' : ''}`}>
        <div className="bg-stone-800/30 border border-amber-800/30 rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-amber-200" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-amber-300 font-semibold truncate">
                  {comment.username}
                </p>
                <div className="flex items-center gap-2 text-amber-400/60 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(comment.createdAt)}</span>
                </div>
              </div>
            </div>
            
            {user && comment.userId === user.id && (
              <button
                onClick={() => handleDeleteComment(comment._id)}
                className="text-red-400 hover:text-red-300 transition-colors"
                title="Delete comment"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <p className="text-amber-200 leading-relaxed mb-3 ml-13">
            {comment.comment}
          </p>

          <div className="flex items-center gap-4 ml-13">
            <button
              onClick={() => handleLikeComment(comment._id)}
              disabled={!isAuthenticated}
              className={`flex items-center gap-1 text-sm transition-colors ${
                hasLiked 
                  ? 'text-red-400 hover:text-red-300' 
                  : 'text-amber-400/60 hover:text-amber-300'
              } ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={isAuthenticated ? (hasLiked ? 'Unlike' : 'Like') : 'Sign in to like'}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
              <span>{comment.likes || 0}</span>
            </button>

            {!isReply && (
              <button
                onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                disabled={!isAuthenticated}
                className={`flex items-center gap-1 text-sm text-amber-400/60 hover:text-amber-300 transition-colors ${
                  !isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                title={isAuthenticated ? 'Reply' : 'Sign in to reply'}
              >
                <Reply className="w-4 h-4" />
                <span>Reply</span>
              </button>
            )}

            {hasReplies && (
              <button
                onClick={() => toggleReplies(comment._id.toString())}
                className="flex items-center gap-1 text-sm text-amber-400/60 hover:text-amber-300 transition-colors"
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                <span>{comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}</span>
              </button>
            )}
          </div>

          {replyingTo === comment._id && (
            <div className="mt-4 ml-13">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value.slice(0, 500))}
                  placeholder={`Reply to ${comment.username}...`}
                  className="flex-1 px-3 py-2 bg-stone-800/50 border border-amber-800/40 rounded-lg text-amber-100 placeholder-amber-600 text-sm focus:outline-none focus:border-amber-600 transition-colors"
                  maxLength={500}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmitReply(comment._id);
                    }
                  }}
                />
                <button
                  onClick={() => handleSubmitReply(comment._id)}
                  disabled={submitting || !replyText.trim()}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-600 disabled:bg-stone-700 disabled:cursor-not-allowed text-white rounded-lg transition-all text-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="text-amber-400/60 text-xs mt-1 text-right">
                {replyText.length}/500
              </div>
            </div>
          )}
        </div>

        {hasReplies && isExpanded && (
          <div className="mt-3 space-y-3">
            {comment.replies.map((reply) => (
              <CommentItem key={reply._id} comment={reply} isReply={true} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-12 bg-stone-900/60 backdrop-blur-sm border-2 border-amber-800/60 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-6 h-6 text-amber-400" />
        <h3 className="text-2xl font-serif font-bold text-amber-300">
          Discussion
        </h3>
        <span className="text-amber-400/60 text-sm">
          ({comments.length} {comments.length === 1 ? 'comment' : 'comments'})
        </span>
      </div>

      {isAuthenticated ? (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="mb-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value.slice(0, 500))}
              placeholder={`Share your thoughts about ${storyTitle}...`}
              className="w-full px-4 py-3 bg-stone-800/50 border border-amber-800/40 rounded-lg text-amber-100 placeholder-amber-600 focus:outline-none focus:border-amber-600 transition-colors resize-none"
              rows="3"
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-amber-400/60 text-xs">
                {newComment.length}/500 characters
              </span>
              {error && (
                <span className="text-red-400 text-xs">{error}</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting || newComment.trim().length === 0}
            className="flex items-center gap-2 px-6 py-2 bg-amber-700 hover:bg-amber-600 disabled:bg-stone-700 disabled:cursor-not-allowed text-white rounded-lg transition-all"
          >
            <Send className="w-4 h-4" />
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-amber-900/20 border border-amber-700/40 rounded-lg text-center">
          <p className="text-amber-300">
            Sign in to join the discussion and share your thoughts
          </p>
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-amber-400/60">
            Loading comments...
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-amber-400/60">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
