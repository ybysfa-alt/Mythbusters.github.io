import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Tag, Share2, BookOpen, TrendingUp } from 'lucide-react';
import { BlogPost } from '../types';
import { samplePosts } from '../data/samplePosts';
import { AdContainer } from './AdContainer';
import { Sidebar } from './Sidebar';

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = samplePosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <Link to="/" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const getMythStatusColor = (status: string) => {
    switch (status) {
      case 'busted':
        return 'bg-red-500 text-white';
      case 'confirmed':
        return 'bg-green-500 text-white';
      case 'plausible':
        return 'bg-yellow-500 text-gray-900';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getMythStatusIcon = (status: string) => {
    switch (status) {
      case 'busted':
        return '🚫';
      case 'confirmed':
        return '✅';
      case 'plausible':
        return '⚠️';
      default:
        return '❓';
    }
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-4xl font-bold text-white mb-6 mt-8">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-3xl font-bold text-white mb-4 mt-6">{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-2xl font-bold text-cyan-400 mb-3 mt-5">{line.substring(4)}</h3>;
      } else if (line.startsWith('- ')) {
        return <li key={index} className="text-gray-300 mb-2 ml-4">{line.substring(2)}</li>;
      } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
        return <li key={index} className="text-gray-300 mb-2 ml-4 list-decimal">{line.substring(3)}</li>;
      } else if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="text-white font-bold mb-4 text-lg">{line.slice(2, -2)}</p>;
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index} className="text-gray-300 mb-4 leading-relaxed text-lg">{line}</p>;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Header Ad */}
      <div className="flex justify-center py-4 border-b border-gray-700">
        <AdContainer size="leaderboard" position="article-header" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Main Article Content */}
          <div className="lg:col-span-3">
            <article className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
              {/* Back Button */}
              <div className="p-6 border-b border-gray-700">
                <Link 
                  to="/" 
                  className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200 group"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                  <span>Back to Articles</span>
                </Link>
              </div>

              {/* Hero Image */}
              <div className="relative">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                
                {/* Myth Status Badge */}
                <div className={`absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-bold ${getMythStatusColor(post.mythStatus)} flex items-center space-x-2`}>
                  <span className="text-2xl">{getMythStatusIcon(post.mythStatus)}</span>
                  <span>{post.mythStatus.toUpperCase()}</span>
                </div>

                {post.featured && (
                  <div className="absolute top-6 left-6 px-4 py-2 bg-cyan-500 text-white rounded-full text-sm font-bold flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>FEATURED</span>
                  </div>
                )}
              </div>

              {/* Article Header */}
              <div className="p-8">
                {/* Category */}
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="h-5 w-5 text-cyan-400" />
                  <span className="text-cyan-400 font-medium capitalize">{post.category}</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8 pb-8 border-b border-gray-700">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>{post.readTime} min read</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  </div>
                  <button className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
                    <Share2 className="h-5 w-5" />
                    <span>Share Article</span>
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Inline Ad */}
                <div className="flex justify-center my-12">
                  <AdContainer size="rectangle" position="article-inline-1" />
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  {formatContent(post.content)}
                </div>

                {/* Bottom Inline Ad */}
                <div className="flex justify-center my-12">
                  <AdContainer size="rectangle" position="article-inline-2" />
                </div>

                {/* Article Footer */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                  <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-xl p-6 border border-cyan-400/20">
                    <h3 className="text-2xl font-bold text-white mb-4">Analysis Summary</h3>
                    <div className={`inline-flex items-center space-x-3 px-4 py-2 rounded-full ${getMythStatusColor(post.mythStatus)} text-lg font-bold mb-4`}>
                      <span className="text-2xl">{getMythStatusIcon(post.mythStatus)}</span>
                      <span>MYTH STATUS: {post.mythStatus.toUpperCase()}</span>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Based on our comprehensive analysis of scientific evidence, expert opinions, and peer-reviewed research, 
                      this myth has been classified as <strong className="text-cyan-400">{post.mythStatus}</strong>. 
                      Our team of experts has thoroughly investigated the claims and provided evidence-based conclusions.
                    </p>
                  </div>
                </div>

                {/* Social Sharing */}
                <div className="mt-8 flex items-center justify-between">
                  <div className="text-gray-400">
                    <span>Found this article helpful? Share it with others!</span>
                  </div>
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200">
                      Share on Twitter
                    </button>
                    <button className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Share on Facebook
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Related Articles */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-white mb-8">Related Mythbusts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {samplePosts
                  .filter(p => p.id !== post.id && p.category === post.category)
                  .slice(0, 2)
                  .map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      to={`/article/${relatedPost.id}`}
                      className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-400 transition-all duration-300"
                    >
                      <img
                        src={relatedPost.imageUrl}
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {relatedPost.excerpt.substring(0, 100)}...
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-12 lg:mt-0 lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};