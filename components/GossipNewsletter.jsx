// components/GossipNewsletter.jsx - ADD MANUAL TRIGGER
'use client';

import React, { useState, useEffect } from 'react';
import { Scroll, Sparkles, Clock, X, RefreshCw, Zap } from 'lucide-react';

const GossipNewsletter = ({ isOpen, onClose }) => {
  const [gossipItems, setGossipItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [edition, setEdition] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchGossip();
    }
  }, [isOpen]);

  const fetchGossip = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gossip?limit=20');
      const data = await response.json();
      
      if (data.success) {
        setGossipItems(data.gossip);
        setEdition(data.edition);
      }
    } catch (error) {
      console.error('Failed to fetch gossip:', error);
    }
    setLoading(false);
  };

  // NEW: Manual gossip generation
  const generateGossip = async () => {
  setGenerating(true);
  try {
    const response = await fetch('/api/gossip/generate', {
      method: 'POST'
    });
      const data = await response.json();
      
      if (data.success) {
        console.log('Gossip generated:', data);
        // Wait a moment then refresh
        setTimeout(() => {
          fetchGossip();
        }, 500);
      }
    } catch (error) {
      console.error('Failed to generate gossip:', error);
    }
    setGenerating(false);
  };

  if (!isOpen) return null;

  const getSeverityColor = (severity) => {
    const colors = {
      scandalous: 'text-red-400 border-red-700/50 bg-red-900/20',
      intriguing: 'text-amber-400 border-amber-700/50 bg-amber-900/20',
      amusing: 'text-purple-400 border-purple-700/50 bg-purple-900/20',
      impressive: 'text-green-400 border-green-700/50 bg-green-900/20',
      curious: 'text-blue-400 border-blue-700/50 bg-blue-900/20'
    };
    return colors[severity] || colors.intriguing;
  };

  const getSeverityLabel = (severity) => {
    const labels = {
      scandalous: 'Most Scandalous',
      intriguing: 'Rather Intriguing',
      amusing: 'Quite Amusing',
      impressive: 'Most Impressive',
      curious: 'Curiously Noted'
    };
    return labels[severity] || 'Noteworthy';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-amber-950 to-stone-900 border-4 border-amber-700/60 rounded-xl max-w-3xl w-full my-8 shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-amber-900 to-red-900 p-6 border-b-4 border-amber-700/60 rounded-t-xl">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-amber-300 hover:text-amber-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-3">
            <Scroll className="w-12 h-12 text-amber-300" />
            <div className="flex-1">
              <h2 className="text-4xl font-serif font-bold text-amber-300 mb-1">
                The Chronicles Gazette
              </h2>
              <p className="text-amber-400/80 text-sm italic">
                "All the Scandal That's Fit to Print (And Some That Isn't)"
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-amber-400/70 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Edition: {edition}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchGossip}
                className="flex items-center gap-2 px-3 py-1 bg-amber-800/30 hover:bg-amber-800/50 rounded transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-xs">Refresh</span>
              </button>
              {/* NEW: Generate button */}
              <button
                onClick={generateGossip}
                disabled={generating}
                className="flex items-center gap-2 px-3 py-1 bg-green-800/30 hover:bg-green-800/50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="w-4 h-4" />
                <span className="text-xs">{generating ? 'Generating...' : 'Generate New'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="text-center py-8">
              <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-4 animate-spin" />
              <p className="text-amber-400">Gathering the latest whispers...</p>
            </div>
          ) : gossipItems.length === 0 ? (
            <div className="text-center py-12">
              <Scroll className="w-16 h-16 text-amber-600/40 mx-auto mb-4" />
              <p className="text-amber-400/60 text-lg mb-4">
                No gossip yet! Play more stories or click "Generate New" to create juicy rumors.
              </p>
              <button
                onClick={generateGossip}
                disabled={generating}
                className="px-6 py-3 bg-gradient-to-r from-amber-700 to-red-700 hover:from-amber-600 hover:to-red-600 text-white rounded-lg transition-all disabled:opacity-50"
              >
                {generating ? 'Generating Gossip...' : 'Generate Gossip Now'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {gossipItems.map((item, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-lg p-5 transition-all hover:scale-102 ${getSeverityColor(item.severity)}`}
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                          {getSeverityLabel(item.severity)}
                        </span>
                        <span className="text-xs opacity-60">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-lg leading-relaxed font-serif">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-900/60 p-4 border-t-2 border-amber-800/30 rounded-b-xl">
          <p className="text-amber-400/60 text-xs text-center italic font-serif">
            "Dear Reader, remember: All gossip is anonymous, as befits proper scandal. 
            Your secrets are safe... mostly."
          </p>
        </div>
      </div>
    </div>
  );
};

export default GossipNewsletter;
