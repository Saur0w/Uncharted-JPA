"use client";

import { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import SignOut from "./signOut";

export default function Admin() {
    const [activeTab, setActiveTab] = useState('blogs');
    const [isEditing, setIsEditing] = useState(false);
    const [editingBlogId, setEditingBlogId] = useState(null);
    const [editingEventId, setEditingEventId] = useState(null);
    const [editingNewsId, setEditingNewsId] = useState(null); // Added for news
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null,
        subtitle: '',
        meta: '',
        members: []
    });

    const [blogFormData, setBlogFormData] = useState({
        title: '',
        subtitle: '',
        content: '',
        image: null,
        author: '',
        tags: [],
        slug: '',
        publishedAt: new Date().toISOString()
    });

    const [eventFormData, setEventFormData] = useState({
        title: '',
        subtitle: '',
        content: '',
        image: null,
        organizer: '',
        categories: [],
        slug: '',
        eventDate: new Date().toISOString().split('T')[0],
        eventTime: '',
        location: '',
        price: '',
        registrationRequired: false,
        registrationLink: '',
        contact: '',
        email: '',
        phone: ''
    });

    const [newsFormData, setNewsFormData] = useState({
        title: '',
        subtitle: '',
        content: '',
        image: null,
        source: '',
        categories: [],
        slug: '',
        publishedAt: new Date().toISOString(),
        urgent: false,
        location: '',
        relatedLinks: []
    });

    const [blogPosts, setBlogPosts] = useState([]);
    const [events, setEvents] = useState([]);
    const [newsArticles, setNewsArticles] = useState([]); // Added for news
    const [isCreatingBlog, setIsCreatingBlog] = useState(false);
    const [isCreatingEvent, setIsCreatingEvent] = useState(false);
    const [isCreatingNews, setIsCreatingNews] = useState(false); // Added for news

    const [data, setData] = useState({
        blogs: { title: '', subtitle: '', content: '', image: null, meta: '' },
        events: { title: '', subtitle: '', content: '', image: null, meta: '' },
        newsletter: { title: '', subtitle: '', content: '', image: null, meta: '' },
        teams: { title: '', subtitle: '', content: '', image: null, meta: '', members: [] }
    });
    const [isLoading, setIsLoading] = useState(true);
    const [uploadError, setUploadError] = useState(null);

    useEffect(() => {
        if (activeTab === 'blogs') {
            loadBlogPosts();
        } else if (activeTab === 'events') {
            loadEvents();
        } else if (activeTab === 'newsletter') {
            loadNewsArticles(); // Added for news
        } else {
            loadSectionData();
        }
    }, [activeTab]);

    const loadBlogPosts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/blogs');
            if (response.ok) {
                const blogData = await response.json();
                setBlogPosts(blogData.posts || []);
            } else {
                console.error('Failed to load blog posts:', response.statusText);
                setBlogPosts([]);
            }
        } catch (error) {
            console.error('Error loading blog posts:', error);
            setBlogPosts([]);
        } finally {
            setIsLoading(false);
        }
    };
    const loadEvents = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/events');
            if (response.ok) {
                const eventData = await response.json();
                setEvents(eventData.events || []);
            } else {
                console.error('Failed to load events:', response.statusText);
                setEvents([]);
            }
        } catch (error) {
            console.error('Error loading events:', error);
            setEvents([]);
        } finally {
            setIsLoading(false);
        }
    };
    const loadNewsArticles = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/news');
            if (response.ok) {
                const newsData = await response.json();
                setNewsArticles(newsData.articles || []);
            } else {
                console.error('Failed to load news articles:', response.statusText);
                setNewsArticles([]);
            }
        } catch (error) {
            console.error('Error loading news articles:', error);
            setNewsArticles([]);
        } finally {
            setIsLoading(false);
        }
    };

    const loadSectionData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/content/${activeTab}`);
            if (response.ok) {
                const sectionData = await response.json();
                setData(prev => ({
                    ...prev,
                    [activeTab]: sectionData
                }));
            } else {
                console.error('Failed to load data:', response.statusText);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const tabs = [
        { key: 'blogs', label: 'Blog Posts' },
        { key: 'events', label: 'Events' },
        { key: 'newsletter', label: 'News Articles' }, // Updated label
        { key: 'teams', label: 'Team Page' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBlogInputChange = (e) => {
        const { name, value } = e.target;
        setBlogFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (name === 'title') {
            const slug = value.toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/--+/g, '-')
                .trim('-');
            setBlogFormData(prev => ({
                ...prev,
                slug: slug
            }));
        }
    };

    const handleEventInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEventFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'title') {
            const slug = value.toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/--+/g, '-')
                .trim('-');
            setEventFormData(prev => ({
                ...prev,
                slug: slug
            }));
        }
    };

    // Added news input change handler
    const handleNewsInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewsFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'title') {
            const slug = value.toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/--+/g, '-')
                .trim('-');
            setNewsFormData(prev => ({
                ...prev,
                slug: slug
            }));
        }
    };

    const handleTagsChange = (e) => {
        const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
        setBlogFormData(prev => ({
            ...prev,
            tags: tags
        }));
    };

    const handleCategoriesChange = (e) => {
        const categories = e.target.value.split(',').map(cat => cat.trim()).filter(cat => cat);
        setEventFormData(prev => ({
            ...prev,
            categories: categories
        }));
    };

    // Added news categories handler
    const handleNewsCategoriesChange = (e) => {
        const categories = e.target.value.split(',').map(cat => cat.trim()).filter(cat => cat);
        setNewsFormData(prev => ({
            ...prev,
            categories: categories
        }));
    };

    const startEditing = () => {
        const currentData = data[activeTab];
        setFormData({
            title: currentData.title || '',
            subtitle: currentData.subtitle || '',
            content: currentData.content || '',
            image: currentData.image || null,
            meta: currentData.meta || '',
            members: currentData.members || []
        });
        setIsEditing(true);
        setUploadError(null);
    };

    const startCreatingBlog = () => {
        setBlogFormData({
            title: '',
            subtitle: '',
            content: '',
            image: null,
            author: '',
            tags: [],
            slug: '',
            publishedAt: new Date().toISOString()
        });
        setIsCreatingBlog(true);
        setEditingBlogId(null);
        setUploadError(null);
    };

    const startCreatingEvent = () => {
        setEventFormData({
            title: '',
            subtitle: '',
            content: '',
            image: null,
            organizer: '',
            categories: [],
            slug: '',
            eventDate: new Date().toISOString().split('T')[0],
            eventTime: '',
            location: '',
            price: '',
            registrationRequired: false,
            registrationLink: '',
            contact: '',
            email: '',
            phone: ''
        });
        setIsCreatingEvent(true);
        setEditingEventId(null);
        setUploadError(null);
    };

    // Added news creation function
    const startCreatingNews = () => {
        setNewsFormData({
            title: '',
            subtitle: '',
            content: '',
            image: null,
            source: '',
            categories: [],
            slug: '',
            publishedAt: new Date().toISOString(),
            urgent: false,
            location: '',
            relatedLinks: []
        });
        setIsCreatingNews(true);
        setEditingNewsId(null);
        setUploadError(null);
    };

    const startEditingBlog = (blog) => {
        setBlogFormData({
            title: blog.title || '',
            subtitle: blog.subtitle || '',
            content: blog.content || '',
            image: blog.image || null,
            author: blog.author || '',
            tags: blog.tags || [],
            slug: blog.slug || '',
            publishedAt: blog.publishedAt || new Date().toISOString()
        });
        setIsCreatingBlog(true);
        setEditingBlogId(blog.id || blog.slug);
        setUploadError(null);
    };

    const startEditingEvent = (event) => {
        setEventFormData({
            title: event.title || '',
            subtitle: event.subtitle || '',
            content: event.content || '',
            image: event.image || null,
            organizer: event.organizer || '',
            categories: event.categories || [],
            slug: event.slug || '',
            eventDate: event.eventDate ? event.eventDate.split('T')[0] : new Date().toISOString().split('T')[0],
            eventTime: event.eventTime || '',
            location: event.location || '',
            price: event.price || '',
            registrationRequired: event.registrationRequired || false,
            registrationLink: event.registrationLink || '',
            contact: event.contact || '',
            email: event.email || '',
            phone: event.phone || ''
        });
        setIsCreatingEvent(true);
        setEditingEventId(event.id || event.slug);
        setUploadError(null);
    };

    // Added news editing function
    const startEditingNews = (article) => {
        setNewsFormData({
            title: article.title || '',
            subtitle: article.subtitle || '',
            content: article.content || '',
            image: article.image || null,
            source: article.source || '',
            categories: article.categories || [],
            slug: article.slug || '',
            publishedAt: article.publishedAt || new Date().toISOString(),
            urgent: article.urgent || false,
            location: article.location || '',
            relatedLinks: article.relatedLinks || []
        });
        setIsCreatingNews(true);
        setEditingNewsId(article.id || article.slug);
        setUploadError(null);
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setIsCreatingBlog(false);
        setIsCreatingEvent(false);
        setIsCreatingNews(false); // Added
        setEditingBlogId(null);
        setEditingEventId(null);
        setEditingNewsId(null); // Added
        setFormData({
            title: '',
            subtitle: '',
            content: '',
            image: null,
            meta: '',
            members: []
        });
        setBlogFormData({
            title: '',
            subtitle: '',
            content: '',
            image: null,
            author: '',
            tags: [],
            slug: '',
            publishedAt: new Date().toISOString()
        });
        setEventFormData({
            title: '',
            subtitle: '',
            content: '',
            image: null,
            organizer: '',
            categories: [],
            slug: '',
            eventDate: new Date().toISOString().split('T')[0],
            eventTime: '',
            location: '',
            price: '',
            registrationRequired: false,
            registrationLink: '',
            contact: '',
            email: '',
            phone: ''
        });
        // Added news form reset
        setNewsFormData({
            title: '',
            subtitle: '',
            content: '',
            image: null,
            source: '',
            categories: [],
            slug: '',
            publishedAt: new Date().toISOString(),
            urgent: false,
            location: '',
            relatedLinks: []
        });
        setUploadError(null);
    };

    const deleteBlogPost = async (blogId) => {
        if (!confirm('Are you sure you want to delete this blog post?')) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/blogs/${blogId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await loadBlogPosts();
                alert('Blog post deleted successfully!');
            } else {
                const errorData = await response.json();
                alert(`Error deleting blog post: ${errorData.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error deleting blog post:', error);
            alert(`Error deleting blog post: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteEvent = async (eventId) => {
        if (!confirm('Are you sure you want to delete this event?')) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/events/${eventId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await loadEvents();
                alert('Event deleted successfully!');
            } else {
                const errorData = await response.json();
                alert(`Error deleting event: ${errorData.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            alert(`Error deleting event: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Added news delete function
    const deleteNewsArticle = async (articleId) => {
        if (!confirm('Are you sure you want to delete this news article?')) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/news/${articleId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await loadNewsArticles();
                alert('News article deleted successfully!');
            } else {
                const errorData = await response.json();
                alert(`Error deleting news article: ${errorData.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error deleting news article:', error);
            alert(`Error deleting news article: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const saveBlogPost = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setUploadError(null);

        const blogData = {
            ...blogFormData,
            id: editingBlogId || Date.now().toString(),
            publishedAt: blogFormData.publishedAt || new Date().toISOString()
        };

        try {
            const response = await fetch('/api/blogs', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: editingBlogId ? 'update' : 'create',
                    blogPost: blogData
                }),
            });

            const responseData = await response.json();

            if (response.ok) {
                setIsCreatingBlog(false);
                setEditingBlogId(null);
                await loadBlogPosts();
                alert('Blog post saved successfully!');
            } else {
                const errorMessage = responseData.error || 'Unknown server error';
                alert(`Error saving blog post: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error saving blog post:', error);
            alert(`Error saving blog post: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const saveEvent = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setUploadError(null);

        const eventData = {
            ...eventFormData,
            id: editingEventId || Date.now().toString(),
            eventDate: eventFormData.eventDate + (eventFormData.eventTime ? `T${eventFormData.eventTime}:00Z` : 'T00:00:00Z')
        };

        try {
            const response = await fetch('/api/events', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: editingEventId ? 'update' : 'create',
                    event: eventData
                }),
            });

            const responseData = await response.json();

            if (response.ok) {
                setIsCreatingEvent(false);
                setEditingEventId(null);
                await loadEvents();
                alert('Event saved successfully!');
            } else {
                const errorMessage = responseData.error || 'Unknown server error';
                alert(`Error saving event: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error saving event:', error);
            alert(`Error saving event: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Added news save function
    const saveNewsArticle = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setUploadError(null);

        const newsData = {
            ...newsFormData,
            id: editingNewsId || Date.now().toString(),
            publishedAt: newsFormData.publishedAt || new Date().toISOString()
        };

        try {
            const response = await fetch('/api/news', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: editingNewsId ? 'update' : 'create',
                    article: newsData
                }),
            });

            const responseData = await response.json();

            if (response.ok) {
                setIsCreatingNews(false);
                setEditingNewsId(null);
                await loadNewsArticles();
                alert('News article saved successfully!');
            } else {
                const errorMessage = responseData.error || 'Unknown server error';
                alert(`Error saving news article: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error saving news article:', error);
            alert(`Error saving news article: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Existing functions for team members, image upload, etc.
    const addTeamMember = () => {
        setFormData(prev => ({
            ...prev,
            members: [...prev.members, { name: '', image: null, id: Date.now() }]
        }));
    };

    const removeTeamMember = (index) => {
        setFormData(prev => ({
            ...prev,
            members: prev.members.filter((_, i) => i !== index)
        }));
    };

    const updateTeamMember = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            members: prev.members.map((member, i) =>
                i === index ? { ...member, [field]: value } : member
            )
        }));
    };

    const handleMemberImageUpload = (index, result) => {
        if (result.event === 'success' && result.info) {
            const imageUrl = result.info.secure_url || result.info.url || result.info.public_id;
            updateTeamMember(index, 'image', imageUrl);
        }
    };

    const handleUploadSuccess = (result) => {
        try {
            if (result.event === 'success' && result.info) {
                const imageUrl = result.info.secure_url || result.info.url || result.info.public_id;
                if (isCreatingBlog) {
                    setBlogFormData(prev => ({
                        ...prev,
                        image: imageUrl
                    }));
                } else if (isCreatingEvent) {
                    setEventFormData(prev => ({
                        ...prev,
                        image: imageUrl
                    }));
                } else if (isCreatingNews) { // Added for news
                    setNewsFormData(prev => ({
                        ...prev,
                        image: imageUrl
                    }));
                } else {
                    setFormData(prev => ({
                        ...prev,
                        image: imageUrl
                    }));
                }
                setUploadError(null);
            }
        } catch (error) {
            console.error('Upload success handler error:', error);
            setUploadError('Error processing uploaded image');
        }
    };

    const handleUploadError = (error) => {
        console.error('Upload error:', error);
        setUploadError('Failed to upload image. Please try again.');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setUploadError(null);

        try {
            const response = await fetch(`/api/content/${activeTab}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (response.ok) {
                setData(prev => ({
                    ...prev,
                    [activeTab]: { ...formData }
                }));
                setIsEditing(false);
                alert('Content saved successfully!');
            } else {
                const errorMessage = responseData.error || responseData.message || 'Unknown server error';
                alert(`Error saving content: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error saving content:', error);
            alert(`Error saving content: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const removeImage = () => {
        if (isCreatingBlog) {
            setBlogFormData(prev => ({ ...prev, image: null }));
        } else if (isCreatingEvent) {
            setEventFormData(prev => ({ ...prev, image: null }));
        } else if (isCreatingNews) { // Added for news
            setNewsFormData(prev => ({ ...prev, image: null }));
        } else {
            setFormData(prev => ({ ...prev, image: null }));
        }
    };

    const SafeUploadButton = ({
                                  uploadPreset,
                                  options,
                                  onSuccess,
                                  onError,
                                  buttonText,
                                  className
                              }) => {
        return (
            <CldUploadWidget
                uploadPreset={uploadPreset}
                options={options}
                onSuccess={onSuccess}
                onError={onError}
            >
                {(widget) => {
                    if (!widget || typeof widget.open !== 'function') {
                        return (
                            <button
                                type="button"
                                className={className}
                                disabled
                                title="Upload widget is loading..."
                            >
                                Loading...
                            </button>
                        );
                    }

                    return (
                        <button
                            type="button"
                            className={className}
                            onClick={() => widget.open()}
                        >
                            {buttonText}
                        </button>
                    );
                }}
            </CldUploadWidget>
        );
    };

    const currentPageData = data[activeTab];

    return (
        <section className={styles.admin}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Content Management</h1>
                </header>
                <SignOut />

                <nav className={styles.tabs}>
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            className={`${styles.tab} ${activeTab === tab.key ? styles.active : ''}`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <main className={styles.content}>
                    {isLoading ? (
                        <div className={styles.loading}>Loading...</div>
                    ) : activeTab === 'blogs' ? (
                        // Blog Posts Management
                        <div className={styles.blogManagement}>
                            {!isCreatingBlog ? (
                                <div className={styles.blogsList}>
                                    <div className={styles.blogsHeader}>
                                        <h2>Blog Posts ({blogPosts.length})</h2>
                                        <button
                                            className={styles.createBtn}
                                            onClick={startCreatingBlog}
                                        >
                                            Create New Post
                                        </button>
                                    </div>

                                    {blogPosts.length === 0 ? (
                                        <div className={styles.noPosts}>
                                            <p>No blog posts found. Create your first post!</p>
                                        </div>
                                    ) : (
                                        <div className={styles.postsGrid}>
                                            {blogPosts.map((post, index) => (
                                                <div key={post.id || index} className={styles.postCard}>
                                                    {post.image && (
                                                        <div className={styles.postImage}>
                                                            <CldImage
                                                                src={post.image}
                                                                alt={post.title}
                                                                width={300}
                                                                height={200}
                                                                crop="fill"
                                                                className={styles.cardImg}
                                                                quality="auto"
                                                                format="auto"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className={styles.postContent}>
                                                        <h3>{post.title}</h3>
                                                        <p className={styles.postSubtitle}>{post.subtitle}</p>
                                                        <div className={styles.postMeta}>
                                                            <span>By {post.author || 'Unknown'}</span>
                                                            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className={styles.postActions}>
                                                            <button
                                                                className={styles.editBtn}
                                                                onClick={() => startEditingBlog(post)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className={styles.deleteBtn}
                                                                onClick={() => deleteBlogPost(post.id || post.slug)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Blog Post Editor
                                <div className={styles.blogEditor}>
                                    <div className={styles.editorHeader}>
                                        <h2>{editingBlogId ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
                                        <button
                                            className={styles.cancelBtn}
                                            onClick={cancelEditing}
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                    {uploadError && (
                                        <div className={styles.errorMessage}>
                                            {uploadError}
                                        </div>
                                    )}

                                    <form onSubmit={saveBlogPost} className={styles.form}>
                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label>Title *</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={blogFormData.title}
                                                    onChange={handleBlogInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Slug *</label>
                                                <input
                                                    type="text"
                                                    name="slug"
                                                    value={blogFormData.slug}
                                                    onChange={handleBlogInputChange}
                                                    required
                                                    placeholder="auto-generated-from-title"
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label>Subtitle</label>
                                                <input
                                                    type="text"
                                                    name="subtitle"
                                                    value={blogFormData.subtitle}
                                                    onChange={handleBlogInputChange}
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Author</label>
                                                <input
                                                    type="text"
                                                    name="author"
                                                    value={blogFormData.author}
                                                    onChange={handleBlogInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Content *</label>
                                            <textarea
                                                name="content"
                                                value={blogFormData.content}
                                                onChange={handleBlogInputChange}
                                                rows="12"
                                                required
                                                placeholder="Write your blog content here..."
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Featured Image</label>
                                            {blogFormData.image ? (
                                                <div className={styles.imagePreview}>
                                                    <CldImage
                                                        src={blogFormData.image}
                                                        alt="Preview"
                                                        width={600}
                                                        height={300}
                                                        crop="fill"
                                                        className={styles.previewImg}
                                                        quality="auto"
                                                        format="auto"
                                                    />
                                                    <button
                                                        type="button"
                                                        className={styles.removeImage}
                                                        onClick={removeImage}
                                                    >
                                                        Remove Image
                                                    </button>
                                                </div>
                                            ) : (
                                                <SafeUploadButton
                                                    uploadPreset="ca_db_images"
                                                    options={{
                                                        sources: ['local', 'url', 'camera'],
                                                        multiple: false,
                                                        maxFiles: 1,
                                                        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
                                                        maxFileSize: 50000000,
                                                        folder: 'admin/blog-posts',
                                                        publicId: `blog_${blogFormData.slug || Date.now()}`,
                                                        resourceType: 'image',
                                                        cropping: false,
                                                        eager: [
                                                            {
                                                                width: 1200,
                                                                height: 600,
                                                                crop: 'limit',
                                                                quality: 'auto',
                                                                format: 'auto'
                                                            }
                                                        ],
                                                        tags: ['blog_post', 'admin_upload']
                                                    }}
                                                    onSuccess={handleUploadSuccess}
                                                    onError={handleUploadError}
                                                    buttonText="Upload Featured Image"
                                                    className={styles.uploadButton}
                                                />
                                            )}
                                        </div>

                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label>Tags (comma-separated)</label>
                                                <input
                                                    type="text"
                                                    value={blogFormData.tags.join(', ')}
                                                    onChange={handleTagsChange}
                                                    placeholder="technology, web development, tutorial"
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Publish Date</label>
                                                <input
                                                    type="datetime-local"
                                                    name="publishedAt"
                                                    value={blogFormData.publishedAt ? new Date(blogFormData.publishedAt).toISOString().slice(0, 16) : ''}
                                                    onChange={handleBlogInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formActions}>
                                            <button
                                                type="submit"
                                                className={styles.saveBtn}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? 'Saving...' : (editingBlogId ? 'Update Post' : 'Create Post')}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    ) : activeTab === 'events' ? (
                        // Events Management
                        <div className={styles.blogManagement}>
                            {!isCreatingEvent ? (
                                <div className={styles.blogsList}>
                                    <div className={styles.blogsHeader}>
                                        <h2>Events ({events.length})</h2>
                                        <button
                                            className={styles.createBtn}
                                            onClick={startCreatingEvent}
                                        >
                                            Create New Event
                                        </button>
                                    </div>

                                    {events.length === 0 ? (
                                        <div className={styles.noPosts}>
                                            <p>No events found. Create your first event!</p>
                                        </div>
                                    ) : (
                                        <div className={styles.postsGrid}>
                                            {events.map((event, index) => (
                                                <div key={event.id || index} className={styles.postCard}>
                                                    {event.image && (
                                                        <div className={styles.postImage}>
                                                            <CldImage
                                                                src={event.image}
                                                                alt={event.title}
                                                                width={300}
                                                                height={200}
                                                                crop="fill"
                                                                className={styles.cardImg}
                                                                quality="auto"
                                                                format="auto"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className={styles.postContent}>
                                                        <h3>{event.title}</h3>
                                                        <p className={styles.postSubtitle}>{event.subtitle}</p>
                                                        <div className={styles.postMeta}>
                                                            <span>📅 {new Date(event.eventDate).toLocaleDateString()}</span>
                                                            <span>📍 {event.location || 'TBA'}</span>
                                                            <span>By {event.organizer || 'Unknown'}</span>
                                                        </div>
                                                        <div className={styles.postActions}>
                                                            <button
                                                                className={styles.editBtn}
                                                                onClick={() => startEditingEvent(event)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className={styles.deleteBtn}
                                                                onClick={() => deleteEvent(event.id || event.slug)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Event Editor
                                <div className={styles.blogEditor}>
                                    <div className={styles.editorHeader}>
                                        <h2>{editingEventId ? 'Edit Event' : 'Create New Event'}</h2>
                                        <button
                                            className={styles.cancelBtn}
                                            onClick={cancelEditing}
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                    {uploadError && (
                                        <div className={styles.errorMessage}>
                                            {uploadError}
                                        </div>
                                    )}

                                    <form onSubmit={saveEvent} className={styles.form}>
                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label>Event Title *</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={eventFormData.title}
                                                    onChange={handleEventInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Slug *</label>
                                                <input
                                                    type="text"
                                                    name="slug"
                                                    value={eventFormData.slug}
                                                    onChange={handleEventInputChange}
                                                    required
                                                    placeholder="auto-generated-from-title"
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label>Subtitle</label>
                                                <input
                                                    type="text"
                                                    name="subtitle"
                                                    value={eventFormData.subtitle}
                                                    onChange={handleEventInputChange}
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Organizer</label>
                                                <input
                                                    type="text"
                                                    name="organizer"
                                                    value={eventFormData.organizer}
                                                    onChange={handleEventInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label>Event Date *</label>
                                                <input
                                                    type="date"
                                                    name="eventDate"
                                                    value={eventFormData.eventDate}
                                                    onChange={handleEventInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Event Time</label>
                                                <input
                                                    type="time"
                                                    name="eventTime"
                                                    value={eventFormData.eventTime}
                                                    onChange={handleEventInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label>Location</label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={eventFormData.location}
                                                    onChange={handleEventInputChange}
                                                    placeholder="Event venue or online"
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Price</label>
                                                <input
                                                    type="text"
                                                    name="price"
                                                    value={eventFormData.price}
                                                    onChange={handleEventInputChange}
                                                    placeholder="free or amount"
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Event Description *</label>
                                            <textarea
                                                name="content"
                                                value={eventFormData.content}
                                                onChange={handleEventInputChange}
                                                rows="8"
                                                required
                                                placeholder="Describe your event..."
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Event Image</label>
                                            {eventFormData.image ? (
                                                <div className={styles.imagePreview}>
                                                    <CldImage
                                                        src={eventFormData.image}
                                                        alt="Preview"
                                                        width={600}
                                                        height={300}
                                                        crop="fill"
                                                        className={styles.previewImg}
                                                        quality="auto"
                                                        format="auto"
                                                    />
                                                    <button
                                                        type="button"
                                                        className={styles.removeImage}
                                                        onClick={removeImage}
                                                    >
                                                        Remove Image
                                                    </button>
                                                </div>
                                            ) : (
                                                <SafeUploadButton
                                                    uploadPreset="ca_db_images"
                                                    options={{
                                                        sources: ['local', 'url', 'camera'],
                                                        multiple: false,
                                                        maxFiles: 1,
                                                        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
                                                        maxFileSize: 50000000,
                                                        folder: 'admin/events',
                                                        publicId: `event_${eventFormData.slug || Date.now()}`,
                                                        resourceType: 'image',
                                                        cropping: false,
                                                        eager: [
                                                            {
                                                                width: 1200,
                                                                height: 600,
                                                                crop: 'limit',
                                                                quality: 'auto',
                                                                format: 'auto'
                                                            }
                                                        ],
                                                        tags: ['event', 'admin_upload']
                                                    }}
                                                    onSuccess={handleUploadSuccess}
                                                    onError={handleUploadError}
                                                    buttonText="Upload Event Image"
                                                    className={styles.uploadButton}
                                                />
                                            )}
                                        </div>

                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label>Categories (comma-separated)</label>
                                                <input
                                                    type="text"
                                                    value={eventFormData.categories.join(', ')}
                                                    onChange={handleCategoriesChange}
                                                    placeholder="technology, networking, workshop"
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name="registrationRequired"
                                                        checked={eventFormData.registrationRequired}
                                                        onChange={handleEventInputChange}
                                                    />
                                                    Registration Required
                                                </label>
                                            </div>
                                        </div>

                                        {eventFormData.registrationRequired && (
                                            <div className={styles.formGroup}>
                                                <label>Registration Link</label>
                                                <input
                                                    type="url"
                                                    name="registrationLink"
                                                    value={eventFormData.registrationLink}
                                                    onChange={handleEventInputChange}
                                                    placeholder="https://registration-link.com"
                                                />
                                            </div>
                                        )}

                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label>Contact</label>
                                                <input
                                                    type="text"
                                                    name="contact"
                                                    value={eventFormData.contact}
                                                    onChange={handleEventInputChange}
                                                    placeholder="Contact person name"
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={eventFormData.email}
                                                    onChange={handleEventInputChange}
                                                    placeholder="contact@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Phone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={eventFormData.phone}
                                                onChange={handleEventInputChange}
                                                placeholder="+91-9999999999"
                                            />
                                        </div>

                                        <div className={styles.formActions}>
                                            <button
                                                type="submit"
                                                className={styles.saveBtn}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? 'Saving...' : (editingEventId ? 'Update Event' : 'Create Event')}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    ) : activeTab === 'newsletter' ? (
                        // News Articles Management - ADDED COMPLETE NEWS SECTION
                        <div className={styles.blogManagement}>
                            {!isCreatingNews ? (
                                <div className={styles.blogsList}>
                                    <div className={styles.blogsHeader}>
                                        <h2>News Articles ({newsArticles.length})</h2>
                                        <button
                                            className={styles.createBtn}
                                            onClick={startCreatingNews}
                                        >
                                            Create New Article
                                        </button>
                                    </div>

                                    {newsArticles.length === 0 ? (
                                        <div className={styles.noPosts}>
                                            <p>No news articles found. Create your first article!</p>
                                        </div>
                                    ) : (
                                        <div className={styles.postsGrid}>
                                            {newsArticles.map((article, index) => (
                                                <div key={article.id || index} className={styles.postCard}>
                                                    {article.image && (
                                                        <div className={styles.postImage}>
                                                            <CldImage
                                                                src={article.image}
                                                                alt={article.title}
                                                                width={300}
                                                                height={200}
                                                                crop="fill"
                                                                className={styles.cardImg}
                                                                quality="auto"
                                                                format="auto"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className={styles.postContent}>
                                                        <h3>{article.title}</h3>
                                                        <p className={styles.postSubtitle}>{article.subtitle}</p>
                                                        <div className={styles.postMeta}>
                                                            <span>Source: {article.source || 'Unknown'}</span>
                                                            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                                                            {article.urgent && (
                                                                <span className={styles.urgentBadge}>🚨 URGENT</span>
                                                            )}
                                                        </div>
                                                        <div className={styles.postActions}>
                                                            <button
                                                                className={styles.editBtn}
                                                                onClick={() => startEditingNews(article)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className={styles.deleteBtn}
                                                                onClick={() => deleteNewsArticle(article.id || article.slug)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // News Article Editor
                                <div className={styles.blogEditor}>
                                    <div className={styles.editorHeader}>
                                        <h2>{editingNewsId ? 'Edit News Article' : 'Create New News Article'}</h2>
                                        <button
                                            className={styles.cancelBtn}
                                            onClick={cancelEditing}
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                    {uploadError && (
                                        <div className={styles.errorMessage}>
                                            {uploadError}
                                        </div>
                                    )}

                                    <form onSubmit={saveNewsArticle} className={styles.form}>
                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label>Article Title *</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={newsFormData.title}
                                                    onChange={handleNewsInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Slug *</label>
                                                <input
                                                    type="text"
                                                    name="slug"
                                                    value={newsFormData.slug}
                                                    onChange={handleNewsInputChange}
                                                    required
                                                    placeholder="auto-generated-from-title"
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label>Subtitle</label>
                                                <input
                                                    type="text"
                                                    name="subtitle"
                                                    value={newsFormData.subtitle}
                                                    onChange={handleNewsInputChange}
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Source</label>
                                                <input
                                                    type="text"
                                                    name="source"
                                                    value={newsFormData.source}
                                                    onChange={handleNewsInputChange}
                                                    placeholder="News source"
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Article Content *</label>
                                            <textarea
                                                name="content"
                                                value={newsFormData.content}
                                                onChange={handleNewsInputChange}
                                                rows="12"
                                                required
                                                placeholder="Write your news article here..."
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Article Image</label>
                                            {newsFormData.image ? (
                                                <div className={styles.imagePreview}>
                                                    <CldImage
                                                        src={newsFormData.image}
                                                        alt="Preview"
                                                        width={600}
                                                        height={300}
                                                        crop="fill"
                                                        className={styles.previewImg}
                                                        quality="auto"
                                                        format="auto"
                                                    />
                                                    <button
                                                        type="button"
                                                        className={styles.removeImage}
                                                        onClick={removeImage}
                                                    >
                                                        Remove Image
                                                    </button>
                                                </div>
                                            ) : (
                                                <SafeUploadButton
                                                    uploadPreset="ca_db_images"
                                                    options={{
                                                        sources: ['local', 'url', 'camera'],
                                                        multiple: false,
                                                        maxFiles: 1,
                                                        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
                                                        maxFileSize: 50000000,
                                                        folder: 'admin/news',
                                                        publicId: `news_${newsFormData.slug || Date.now()}`,
                                                        resourceType: 'image',
                                                        cropping: false,
                                                        eager: [
                                                            {
                                                                width: 1200,
                                                                height: 600,
                                                                crop: 'limit',
                                                                quality: 'auto',
                                                                format: 'auto'
                                                            }
                                                        ],
                                                        tags: ['news_article', 'admin_upload']
                                                    }}
                                                    onSuccess={handleUploadSuccess}
                                                    onError={handleUploadError}
                                                    buttonText="Upload Article Image"
                                                    className={styles.uploadButton}
                                                />
                                            )}
                                        </div>

                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label>Categories (comma-separated)</label>
                                                <input
                                                    type="text"
                                                    value={newsFormData.categories.join(', ')}
                                                    onChange={handleNewsCategoriesChange}
                                                    placeholder="breaking, politics, technology, business"
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Location</label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={newsFormData.location}
                                                    onChange={handleNewsInputChange}
                                                    placeholder="Where did this happen?"
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label>Publish Date</label>
                                                <input
                                                    type="datetime-local"
                                                    name="publishedAt"
                                                    value={newsFormData.publishedAt ? new Date(newsFormData.publishedAt).toISOString().slice(0, 16) : ''}
                                                    onChange={handleNewsInputChange}
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name="urgent"
                                                        checked={newsFormData.urgent}
                                                        onChange={handleNewsInputChange}
                                                    />
                                                    Mark as Urgent/Breaking News
                                                </label>
                                            </div>
                                        </div>

                                        <div className={styles.formActions}>
                                            <button
                                                type="submit"
                                                className={styles.saveBtn}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? 'Saving...' : (editingNewsId ? 'Update Article' : 'Create Article')}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    ) : !isEditing ? (
                        // Section Preview (non-blog/event/news)
                        <div className={styles.preview}>
                            <div className={styles.previewHeader}>
                                <div>
                                    <h2>{currentPageData.title || 'No title set'}</h2>
                                    <p className={styles.subtitle}>{currentPageData.subtitle || 'No subtitle set'}</p>
                                </div>
                                <button
                                    className={styles.editBtn}
                                    onClick={startEditing}
                                >
                                    Edit Page
                                </button>
                            </div>

                            {currentPageData.image && (
                                <div className={styles.previewImage}>
                                    <CldImage
                                        src={currentPageData.image}
                                        alt={currentPageData.title || 'Page image'}
                                        width={800}
                                        height={400}
                                        crop="fill"
                                        className={styles.previewImg}
                                        sizes="(max-width: 768px) 100vw, 800px"
                                        quality="auto"
                                        format="auto"
                                    />
                                </div>
                            )}

                            <div className={styles.previewContent}>
                                <p>{currentPageData.content || 'No content available'}</p>
                            </div>

                            {activeTab === 'teams' && currentPageData.members && currentPageData.members.length > 0 && (
                                <div className={styles.teamPreview}>
                                    <h3>Team Members</h3>
                                    <div className={styles.membersGrid}>
                                        {currentPageData.members.map((member, index) => (
                                            <div key={index} className={styles.memberCard}>
                                                {member.image && (
                                                    <CldImage
                                                        src={member.image}
                                                        alt={member.name || 'Team member'}
                                                        width={200}
                                                        height={200}
                                                        crop="fill"
                                                        className={styles.memberImage}
                                                        quality="auto"
                                                        format="auto"
                                                    />
                                                )}
                                                <h4>{member.name || 'No name'}</h4>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {currentPageData.meta && (
                                <div className={styles.meta}>
                                    {currentPageData.meta}
                                </div>
                            )}
                        </div>
                    ) : (
                        // Section Editor (non-blog/event/news)
                        <div className={styles.editor}>
                            <div className={styles.editorHeader}>
                                <h2>Edit {tabs.find(tab => tab.key === activeTab)?.label}</h2>
                                <button
                                    className={styles.cancelBtn}
                                    onClick={cancelEditing}
                                >
                                    Cancel
                                </button>
                            </div>

                            {uploadError && (
                                <div className={styles.errorMessage}>
                                    {uploadError}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label>Page Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Subtitle</label>
                                        <input
                                            type="text"
                                            name="subtitle"
                                            value={formData.subtitle}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Content</label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        rows="8"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Hero Image</label>
                                    {formData.image ? (
                                        <div className={styles.imagePreview}>
                                            <CldImage
                                                src={formData.image}
                                                alt="Preview"
                                                width={600}
                                                height={300}
                                                crop="fill"
                                                className={styles.previewImg}
                                                sizes="(max-width: 768px) 100vw, 600px"
                                                quality="auto"
                                                format="auto"
                                            />
                                            <button
                                                type="button"
                                                className={styles.removeImage}
                                                onClick={removeImage}
                                            >
                                                Remove Image
                                            </button>
                                        </div>
                                    ) : (
                                        <SafeUploadButton
                                            uploadPreset="ca_db_images"
                                            options={{
                                                sources: ['local', 'url', 'camera'],
                                                multiple: false,
                                                maxFiles: 1,
                                                clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
                                                maxFileSize: 50000000,
                                                folder: `admin/${activeTab}`,
                                                publicId: `${activeTab}_hero_${Date.now()}`,
                                                resourceType: 'image',
                                                cropping: false,
                                                eager: [
                                                    {
                                                        width: 1200,
                                                        height: 600,
                                                        crop: 'limit',
                                                        quality: 'auto',
                                                        format: 'auto'
                                                    }
                                                ],
                                                chunksizeBytes: 6000000,
                                                tags: [`${activeTab}_hero`, 'admin_upload']
                                            }}
                                            onSuccess={handleUploadSuccess}
                                            onError={handleUploadError}
                                            buttonText="Upload Hero Image"
                                            className={styles.uploadButton}
                                        />
                                    )}
                                </div>

                                {/* Team Members Management - Only show for teams tab */}
                                {activeTab === 'teams' && (
                                    <div className={styles.formGroup}>
                                        <div className={styles.membersHeader}>
                                            <label>Team Members</label>
                                            <button
                                                type="button"
                                                className={styles.addMemberBtn}
                                                onClick={addTeamMember}
                                            >
                                                Add Member
                                            </button>
                                        </div>

                                        <div className={styles.membersEditor}>
                                            {formData.members.map((member, index) => (
                                                <div key={member.id || index} className={styles.memberEditor}>
                                                    <div className={styles.memberEditorHeader}>
                                                        <h4>Member {index + 1}</h4>
                                                        <button
                                                            type="button"
                                                            className={styles.removeMemberBtn}
                                                            onClick={() => removeTeamMember(index)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>

                                                    <div className={styles.memberFields}>
                                                        <div className={styles.formGroup}>
                                                            <label>Name</label>
                                                            <input
                                                                type="text"
                                                                value={member.name}
                                                                onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                                                                placeholder="Enter member name"
                                                                required
                                                            />
                                                        </div>

                                                        <div className={styles.formGroup}>
                                                            <label>Profile Image</label>
                                                            {member.image ? (
                                                                <div className={styles.imagePreview}>
                                                                    <CldImage
                                                                        src={member.image}
                                                                        alt={member.name || 'Member'}
                                                                        width={200}
                                                                        height={200}
                                                                        crop="fill"
                                                                        className={styles.memberImg}
                                                                        quality="auto"
                                                                        format="auto"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className={styles.removeImage}
                                                                        onClick={() => updateTeamMember(index, 'image', null)}
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <SafeUploadButton
                                                                    uploadPreset="ca_db_images"
                                                                    options={{
                                                                        sources: ['local', 'url', 'camera'],
                                                                        multiple: false,
                                                                        maxFiles: 1,
                                                                        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
                                                                        maxFileSize: 10000000,
                                                                        folder: `admin/teams/members`,
                                                                        publicId: `member_${Date.now()}_${index}`,
                                                                        resourceType: 'image',
                                                                        cropping: false,
                                                                        eager: [
                                                                            {
                                                                                width: 400,
                                                                                height: 400,
                                                                                crop: 'limit',
                                                                                quality: 'auto',
                                                                                format: 'auto'
                                                                            }
                                                                        ],
                                                                        tags: ['team_member', 'admin_upload']
                                                                    }}
                                                                    onSuccess={(result) => handleMemberImageUpload(index, result)}
                                                                    onError={handleUploadError}
                                                                    buttonText="Upload Profile Image"
                                                                    className={styles.uploadButton}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {formData.members.length === 0 && (
                                                <div className={styles.noMembers}>
                                                    <p>No team members added yet. Click "Add Member" to get started.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className={styles.formGroup}>
                                    <label>Meta Information</label>
                                    <input
                                        type="text"
                                        name="meta"
                                        value={formData.meta}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Updated monthly, Last updated: Jan 2024"
                                    />
                                </div>

                                <div className={styles.formActions}>
                                    <button
                                        type="submit"
                                        className={styles.saveBtn}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </main>
            </div>
        </section>
    );
}
