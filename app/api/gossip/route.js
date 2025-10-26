// app/api/gossip/route.js
import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    
    const gossip = await getCollection('gossip');
    
    // Get recent gossip items
    const gossipItems = await gossip
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    
    return NextResponse.json({
      success: true,
      gossip: gossipItems,
      edition: new Date().toISOString().split('T')[0]
    });
    
  } catch (error) {
    console.error('Gossip fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gossip' },
      { status: 500 }
    );
  }
}
