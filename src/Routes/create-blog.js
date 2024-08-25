import { v4 as uuidv4 } from 'uuid';
import Blog from '../models/Blog.js'; // Ensure the correct path and file extension

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, content, category, author, authorProfession, authorImageUrl, blogImageUrl } = req.body;

    // Validate the data
    if (!title || !description || !content || !category || !author || !authorProfession || !authorImageUrl || !blogImageUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new blog post object
    const newBlogPost = new Blog({
      id: uuidv4(),
      title,
      description,
      content,
      category,
      author,
      authorProfession,
      authorImageUrl,
      blogImageUrl,
      lastUpdated: new Date().toISOString(),
    });

    try {
      // Save the new blog post to the database
      const savedBlogPost = await newBlogPost.save();
      console.log('New blog post created:', savedBlogPost);

      // Respond with the created blog post
      return res.status(201).json({ success: true, data: savedBlogPost });
    } catch (error) {
      console.error('Error saving blog post:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}