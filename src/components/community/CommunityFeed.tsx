import React, { useState } from 'react';
import { User } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Heart, MessageCircle, Share, Plus, Camera } from 'lucide-react';

interface CommunityFeedProps {
  user: User;
}

interface Post {
  id: string;
  author: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  category: string;
  isLiked: boolean;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: 'Sarah Green',
    content: 'Just completed my 30-day streak! 🎉 Started with small changes like using reusable bags, now I\'m composting and growing my own herbs. The journey has been incredible!',
    likes: 24,
    comments: 8,
    timestamp: '2 hours ago',
    category: 'milestone',
    isLiked: false
  },
  {
    id: '2',
    author: 'Mike Earth',
    content: 'Found this amazing zero-waste store in downtown! They have everything from bamboo toothbrushes to bulk spices. Supporting local and sustainable businesses feels so good! 🌱',
    image: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: 18,
    comments: 5,
    timestamp: '4 hours ago',
    category: 'discovery',
    isLiked: true
  },
  {
    id: '3',
    author: 'Luna Forest',
    content: 'Meal prep Sunday with a twist - all plant-based meals this week! 🥬 Made quinoa bowls, veggie stir-fry, and lentil soup. Saving money and the planet at the same time!',
    likes: 31,
    comments: 12,
    timestamp: '1 day ago',
    category: 'food',
    isLiked: false
  },
  {
    id: '4',
    author: 'Alex Rivers',
    content: 'Biked to work for the first time today instead of driving! 🚴‍♂️ It took a bit longer but the fresh air and exercise were amazing. Plus I saved on gas and parking!',
    likes: 15,
    comments: 6,
    timestamp: '2 days ago',
    category: 'transportation',
    isLiked: false
  }
];

export const CommunityFeed: React.FC<CommunityFeedProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPost, setNewPost] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: user.name || 'You',
        content: newPost,
        likes: 0,
        comments: 0,
        timestamp: 'now',
        category: 'general',
        isLiked: false
      };
      setPosts(prev => [post, ...prev]);
      setNewPost('');
      setShowNewPost(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      milestone: 'bg-yellow-100 text-yellow-600',
      discovery: 'bg-blue-100 text-blue-600',
      food: 'bg-green-100 text-green-600',
      transportation: 'bg-purple-100 text-purple-600',
      general: 'bg-gray-100 text-gray-600'
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      milestone: '🏆',
      discovery: '🔍',
      food: '🍃',
      transportation: '🚴',
      general: '💬'
    };
    return icons[category as keyof typeof icons] || icons.general;
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Create Post */}
      <Card className="p-6">
        {!showNewPost ? (
          <Button
            onClick={() => setShowNewPost(true)}
            variant="primary"
            fullWidth
            className="flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Share Your Eco Journey
          </Button>
        ) : (
          <div>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What eco-friendly action did you take today? Share your story with the community..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={4}
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-green-600 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="space-x-2">
                <Button
                  onClick={() => setShowNewPost(false)}
                  variant="secondary"
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreatePost}
                  variant="primary"
                  size="sm"
                  disabled={!newPost.trim()}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                {post.author.charAt(0)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-800">{post.author}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                    {getCategoryIcon(post.category)} {post.category}
                  </span>
                  <span className="text-sm text-gray-500">• {post.timestamp}</span>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
                
                {post.image && (
                  <div className="mb-4">
                    <img 
                      src={post.image} 
                      alt="Post content" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex space-x-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-1 transition-colors ${
                        post.isLiked ? 'text-red-500' : 'hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                      <Share className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Community Guidelines */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h4 className="font-bold text-blue-800 mb-2">🌍 Community Guidelines</h4>
        <ul className="text-blue-600 text-sm space-y-1">
          <li>• Share authentic eco-friendly experiences and tips</li>
          <li>• Be supportive and encouraging to fellow eco-warriors</li>
          <li>• Avoid promotional content or spam</li>
          <li>• Respect privacy and don't share others' locations</li>
          <li>• Focus on positive environmental impact</li>
        </ul>
      </Card>
    </div>
  );
};