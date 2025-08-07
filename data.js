export const blogPosts = [
	{
		id: '1',
		title: 'Building Modern Web Applications with React 18',
		excerpt:
			'Explore the latest features in React 18 including concurrent rendering, automatic batching, and the new Suspense capabilities that will transform how you build web applications.',
		content: `# Building Modern Web Applications with React 18

React 18 has revolutionized the way we build modern web applications. With its new concurrent features and improved performance optimizations, developers can create more responsive and user-friendly applications than ever before.

## Key Features

### 1. Concurrent Rendering
Concurrent rendering allows React to prepare multiple versions of the UI at the same time. This means that React can start rendering an update, pause if something more urgent comes up, and then continue where it left off.

### 2. Automatic Batching
React 18 automatically batches multiple state updates into a single re-render for better performance, even when they occur inside promises, timeouts, or native event handlers.

### 3. Suspense Improvements
The new Suspense features make it easier to handle loading states and improve the overall user experience by providing better control over when and how components are displayed.

## Getting Started

To start using React 18 in your project, simply update your package.json:

\`\`\`bash
npm install react@18 react-dom@18
\`\`\`

Then update your root component to use the new createRoot API:

\`\`\`javascript
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
\`\`\`

## Conclusion

React 18 represents a significant step forward in building modern web applications. The new features not only improve performance but also provide developers with more tools to create exceptional user experiences.`,
		author: {
			name: 'Sarah Johnson',
			avatar: '/600x400.svg',
			role: 'Frontend Developer',
		},
		publishedAt: '2 days ago',
		readTime: '8 min read',
		category: 'Technology',
		tags: ['React', 'JavaScript', 'Web Development', 'Frontend'],
		image: '/600x400.svg',
		likes: 124,
		comments: 18,
		views: 2543,
		featured: true,
	},
	{
		id: '2',
		title: 'The Future of Design Systems: Building Scalable UI Components',
		excerpt:
			'Learn how modern design systems are evolving to meet the needs of large-scale applications and distributed teams, with practical tips for implementation.',
		content: `# The Future of Design Systems

Design systems have become the backbone of modern product development, enabling teams to build consistent, scalable, and maintainable user interfaces across multiple platforms and applications.

## What Makes a Great Design System?

A well-designed system should provide:
- **Consistency** across all touchpoints
- **Scalability** for growing teams and products
- **Flexibility** to adapt to changing needs
- **Documentation** that's easy to understand and follow

## Implementation Best Practices

1. Start small and iterate
2. Involve stakeholders early
3. Document everything
4. Test across different contexts
5. Maintain and evolve continuously

Design systems are not just about components—they're about creating a shared language that brings teams together and accelerates product development.`,
		author: {
			name: 'Mike Chen',
			avatar: '/600x400.svg',
			role: 'Design Systems Lead',
		},
		publishedAt: '4 days ago',
		readTime: '6 min read',
		category: 'Design',
		tags: ['Design Systems', 'UX/UI', 'Components', 'Scalability'],
		image: '/600x400.svg',
		likes: 89,
		comments: 12,
		views: 1876,
	},
	{
		id: '3',
		title: 'Remote Work Revolution: Building Distributed Teams That Thrive',
		excerpt:
			'Discover the strategies and tools that successful companies use to build and manage remote teams, including communication best practices and productivity tips.',
		content: `# Remote Work Revolution

The shift to remote work has fundamentally changed how we think about team collaboration, productivity, and work-life balance. Companies that adapt quickly to this new reality are seeing remarkable benefits.

## Key Success Factors

### Communication
- Regular check-ins and stand-ups
- Clear documentation practices
- Asynchronous communication tools
- Video calls for complex discussions

### Tools and Technology
- Project management platforms
- Real-time collaboration tools
- Time tracking and productivity apps
- Security and VPN solutions

### Culture and Management
- Trust-based management
- Results-oriented performance metrics
- Flexible working hours
- Regular team building activities

The future of work is distributed, and companies that embrace this change will have access to global talent and improved employee satisfaction.`,
		author: {
			name: 'Emily Rodriguez',
			avatar: '/600x400.svg',
			role: 'HR Director',
		},
		publishedAt: '1 week ago',
		readTime: '5 min read',
		category: 'Business',
		tags: ['Remote Work', 'Management', 'Productivity', 'Team Building'],
		image: '/600x400.svg',
		likes: 156,
		comments: 24,
		views: 3210,
	},
	{
		id: '4',
		title: 'AI and Machine Learning: Transforming User Experiences',
		excerpt:
			'Explore how artificial intelligence and machine learning are being integrated into modern applications to create personalized and intelligent user experiences.',
		content: `# AI and Machine Learning in UX

Artificial Intelligence and Machine Learning are no longer just buzzwords—they're becoming integral parts of creating exceptional user experiences across all types of applications.

## Current Applications

- **Personalization**: Tailoring content and recommendations
- **Automation**: Streamlining repetitive tasks
- **Prediction**: Anticipating user needs and behaviors
- **Optimization**: Improving performance and efficiency

## Implementation Considerations

When integrating AI/ML into your applications, consider:
1. Data privacy and security
2. User transparency and control
3. Fallback mechanisms for edge cases
4. Continuous learning and improvement

The key is to enhance human capabilities rather than replace them, creating more intuitive and helpful user experiences.`,
		author: {
			name: 'David Kim',
			avatar: '/600x400.svg',
			role: 'AI Product Manager',
		},
		publishedAt: '1 week ago',
		readTime: '7 min read',
		category: 'Technology',
		tags: ['AI', 'Machine Learning', 'UX', 'Innovation'],
		image: '/600x400.svg',
		likes: 203,
		comments: 31,
		views: 4127,
	},
	{
		id: '5',
		title: 'Sustainable Design: Creating Eco-Friendly Digital Products',
		excerpt:
			'Learn about sustainable design principles and how to reduce the environmental impact of digital products while maintaining excellent user experiences.',
		content: `# Sustainable Design Principles

As digital products consume increasing amounts of energy, designers and developers have a responsibility to create more sustainable and eco-friendly solutions.

## Design for Efficiency

- Optimize images and assets
- Minimize data transfer
- Use efficient code practices
- Consider dark mode options

## User-Centered Sustainability

- Extend device lifecycles
- Reduce cognitive load
- Design for accessibility
- Promote conscious consumption

Sustainable design isn't just about the environment—it often leads to better performance, lower costs, and improved user satisfaction.`,
		author: {
			name: 'Lisa Thompson',
			avatar: '/600x400.svg',
			role: 'Sustainability Designer',
		},
		publishedAt: '2 weeks ago',
		readTime: '4 min read',
		category: 'Design',
		tags: ['Sustainability', 'Environment', 'UX', 'Performance'],
		image: '/600x400.svg',
		likes: 67,
		comments: 8,
		views: 1234,
	},
	{
		id: '6',
		title: 'Startup Growth Strategies: From Idea to Scale',
		excerpt:
			'A comprehensive guide to scaling your startup from initial concept to sustainable growth, including funding strategies and team building advice.',
		content: `# Startup Growth Strategies

Building a successful startup requires more than just a great idea—it demands strategic planning, execution excellence, and the ability to adapt quickly to market changes.

## Growth Phases

### 1. Validation Phase
- Market research and validation
- MVP development
- Early customer feedback
- Product-market fit assessment

### 2. Growth Phase
- Customer acquisition strategies
- Product improvement and iteration
- Team expansion
- Funding rounds

### 3. Scale Phase
- Process optimization
- Market expansion
- Strategic partnerships
- Exit planning

Each phase requires different skills, resources, and mindsets. The key is knowing when to transition between phases and how to maintain momentum throughout the journey.`,
		author: {
			name: 'Alex Martinez',
			avatar: '/600x400.svg',
			role: 'Startup Advisor',
		},
		publishedAt: '2 weeks ago',
		readTime: '9 min read',
		category: 'Business',
		tags: ['Startup', 'Growth', 'Strategy', 'Entrepreneurship'],
		image: '/600x400.svg',
		likes: 298,
		comments: 42,
		views: 5432,
	},
]

export const getFeaturedPosts = () => blogPosts.filter((post) => post.featured)
export const getPostsByCategory = (category) =>
	blogPosts.filter((post) => post.category === category)
export const getPostById = (id) => blogPosts.find((post) => post.id === id)
