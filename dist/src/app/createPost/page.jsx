"use strict";
'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateBlog;
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const navigation_1 = require("next/navigation");
function CreateBlog() {
    const { register, handleSubmit, formState: { errors }, reset } = (0, react_hook_form_1.useForm)();
    const router = (0, navigation_1.useRouter)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const onSubmit = (data) => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = yield fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok)
                throw new Error('Failed to create blog');
            reset();
            alert('post has been added!');
            router.push('/');
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    });
    return (<div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
  <div className="max-w-2xl w-full bg-slate-50 shadow-lg rounded-xl p-8">
    <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
      Create a New Blog
    </h1>
    
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Title */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Title</label>
        <input {...register('title', { required: 'Title is required' })} className="w-full border border-gray-300 p-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter title"/>
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      {/* Content */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Content</label>
        <textarea {...register('content', { required: 'Content is required' })} className="w-full border border-gray-300 p-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" rows={6} placeholder="Write your blog content..."/>
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400" disabled={loading}>
        {loading ? 'Submitting...' : 'Create Blog'}
      </button>
    </form>
  </div>
    </div>);
}
