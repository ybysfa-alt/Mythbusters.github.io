import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Eye, Save, X } from 'lucide-react';
import { BlogPost } from '../types';
import { samplePosts } from '../data/samplePosts';

export const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(samplePosts);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost>>({});
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleSave = () => {
    if (isEditing && editingPost.id) {
      setPosts(posts.map(post => 
        post.id === editingPost.id ? editingPost as BlogPost : post
      ));
    } else {
      // Add new post
      const newPost: BlogPost = {
        ...editingPost,
        id: Date.now().toString(),
        publishDate: new Date().toISOString().split('T')[0],
        author: 'Admin',
        readTime: Math.ceil((editingPost.content?.length || 0) / 1000)
      } as BlogPost;
      setPosts([newPost, ...posts]);
    }
    
    setShowForm(false);
    setIsEditing(false);
    setEditingPost({});
  };

  const handleCancel = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditingPost({});
  };

  const handleNewPost = () => {
    setEditingPost({
      title: '',
      excerpt: '',
      content: '',
      category: 'science',
      tags: [],
      imageUrl: '',
      featured: false,
      mythStatus: 'busted'
    });
    setIsEditing(false);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={handleNewPost}
            className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-400 transition-colors duration-200"
          >
            <Plus className="h-5 w-5" />
            <span>New Post</span>
          </button>
        </div>

        {/* Post Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {isEditing ? 'Edit Post' : 'Create New Post'}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={editingPost.title || ''}
                    onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Excerpt</label>
                  <textarea
                    value={editingPost.excerpt || ''}
                    onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 h-20"
                    placeholder="Enter post excerpt"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Content (Markdown)</label>
                  <textarea
                    value={editingPost.content || ''}
                    onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 h-40"
                    placeholder="Enter post content in Markdown format"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
                    <select
                      value={editingPost.category || 'science'}
                      onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="science">Science & Technology</option>
                      <option value="health">Health & Medicine</option>
                      <option value="history">History & Culture</option>
                      <option value="food">Food & Nutrition</option>
                      <option value="urban">Urban Legends</option>
                      <option value="nature">Nature & Animals</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Myth Status</label>
                    <select
                      value={editingPost.mythStatus || 'busted'}
                      onChange={(e) => setEditingPost({...editingPost, mythStatus: e.target.value as 'busted' | 'confirmed' | 'plausible'})}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="busted">Busted</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="plausible">Plausible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    value={editingPost.imageUrl || ''}
                    onChange={(e) => setEditingPost({...editingPost, imageUrl: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={editingPost.tags?.join(', ') || ''}
                    onChange={(e) => setEditingPost({...editingPost, tags: e.target.value.split(',').map(tag => tag.trim())})}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingPost.featured || false}
                      onChange={(e) => setEditingPost({...editingPost, featured: e.target.checked})}
                      className="rounded bg-gray-800 border-gray-700 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-gray-300">Featured Post</span>
                  </label>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-400 transition-colors duration-200"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Post</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Table */}
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-800 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{post.title}</div>
                      <div className="text-gray-400 text-sm">{post.excerpt.substring(0, 100)}...</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-md capitalize">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${
                        post.mythStatus === 'busted' ? 'bg-red-100 text-red-800' :
                        post.mythStatus === 'confirmed' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.mythStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(post.publishDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-300 transition-colors duration-200">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};