import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { suggestions } from '../../utils/data';
import { ChevronLeft, ChevronRight, Lightbulb, Heart, BookmarkPlus } from 'lucide-react';
import { getCategoryColor } from '../../utils/gameLogic';

export const Suggestions: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedSuggestions, setSavedSuggestions] = useState<string[]>([]);
  const [likedSuggestions, setLikedSuggestions] = useState<string[]>([]);

  const currentSuggestion = suggestions[currentIndex];

  const nextSuggestion = () => {
    setCurrentIndex((prev) => (prev + 1) % suggestions.length);
  };

  const previousSuggestion = () => {
    setCurrentIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
  };

  const toggleSaved = (suggestionId: string) => {
    setSavedSuggestions(prev => 
      prev.includes(suggestionId)
        ? prev.filter(id => id !== suggestionId)
        : [...prev, suggestionId]
    );
  };

  const toggleLiked = (suggestionId: string) => {
    setLikedSuggestions(prev => 
      prev.includes(suggestionId)
        ? prev.filter(id => id !== suggestionId)
        : [...prev, suggestionId]
    );
  };

  const isLiked = (suggestionId: string) => likedSuggestions.includes(suggestionId);
  const isSaved = (suggestionId: string) => savedSuggestions.includes(suggestionId);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Eco Suggestions 💡</h1>
        <p className="text-gray-600">Discover new ways to live sustainably and make a positive impact</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <Lightbulb className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{suggestions.length}</p>
              <p className="text-sm text-gray-600">Tips Available</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-red-50 to-pink-50">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{likedSuggestions.length}</p>
              <p className="text-sm text-gray-600">Liked Tips</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <BookmarkPlus className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{savedSuggestions.length}</p>
              <p className="text-sm text-gray-600">Saved Tips</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Suggestion Card */}
      <div className="mb-8">
        <Card className="p-8 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 ${getCategoryColor(currentSuggestion.category)} rounded-full mb-4`}>
              <span className="text-2xl text-white">
                {currentSuggestion.category === 'transportation' && '🚗'}
                {currentSuggestion.category === 'energy' && '⚡'}
                {currentSuggestion.category === 'water' && '💧'}
                {currentSuggestion.category === 'waste' && '♻️'}
                {currentSuggestion.category === 'food' && '🍃'}
                {currentSuggestion.category === 'shopping' && '🛒'}
                {currentSuggestion.category === 'nature' && '🌳'}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {currentSuggestion.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              {currentSuggestion.description}
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800 font-semibold mb-2">🌱 Environmental Impact:</p>
              <p className="text-green-700">{currentSuggestion.impact}</p>
            </div>
            {currentSuggestion.funFact && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-semibold mb-2">💡 Did You Know?</p>
                <p className="text-blue-700">{currentSuggestion.funFact}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button
              onClick={() => toggleLiked(currentSuggestion.id)}
              className={`p-3 rounded-full transition-colors ${
                isLiked(currentSuggestion.id)
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 hover:bg-red-50 text-gray-600'
              }`}
            >
              <Heart className={`h-6 w-6 ${isLiked(currentSuggestion.id) ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={() => toggleSaved(currentSuggestion.id)}
              className={`p-3 rounded-full transition-colors ${
                isSaved(currentSuggestion.id)
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 hover:bg-blue-50 text-gray-600'
              }`}
            >
              <BookmarkPlus className={`h-6 w-6 ${isSaved(currentSuggestion.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              onClick={previousSuggestion}
              variant="secondary"
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                {currentIndex + 1} of {suggestions.length}
              </p>
              <div className="flex space-x-1 mt-2">
                {suggestions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <Button
              onClick={nextSuggestion}
              variant="secondary"
              className="flex items-center"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {suggestions.map((suggestion, index) => (
          <Card
            key={suggestion.id}
            className={`p-4 cursor-pointer transition-all ${
              index === currentIndex
                ? 'ring-2 ring-green-500 bg-green-50'
                : 'hover:shadow-md'
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${getCategoryColor(suggestion.category)} rounded-full flex items-center justify-center text-white`}>
                {suggestion.category === 'transportation' && '🚗'}
                {suggestion.category === 'energy' && '⚡'}
                {suggestion.category === 'water' && '💧'}
                {suggestion.category === 'waste' && '♻️'}
                {suggestion.category === 'food' && '🍃'}
                {suggestion.category === 'shopping' && '🛒'}
                {suggestion.category === 'nature' && '🌳'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {suggestion.title}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {suggestion.category}
                </p>
              </div>
              <div className="flex space-x-1">
                {isLiked(suggestion.id) && (
                  <Heart className="h-4 w-4 text-red-500 fill-current" />
                )}
                {isSaved(suggestion.id) && (
                  <BookmarkPlus className="h-4 w-4 text-blue-500 fill-current" />
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};