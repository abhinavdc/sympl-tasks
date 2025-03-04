import { Priority, Status, Task } from "./types";


export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Write project proposal",
    status: Status.InProgress,
    priority: Priority.High,
    customFields: {},
  },
  {
    id: 2,
    title: "Fix login page bug",
    status: Status.NotStarted,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 3,
    title: "Design homepage layout",
    status: Status.InProgress,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 4,
    title: "Update API documentation",
    status: Status.Completed,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 5,
    title: "Refactor user authentication",
    status: Status.InProgress,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 6,
    title: "Optimize database queries",
    status: Status.NotStarted,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 7,
    title: "Review PR #345",
    status: Status.Completed,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 8,
    title: "Implement dark mode",
    status: Status.Completed,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 9,
    title: "Schedule team meeting",
    status: Status.Completed,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 10,
    title: "Prepare monthly report",
    status: Status.InProgress,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 11,
    title: "Fix CSS styling issue",
    status: Status.Completed,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 12,
    title: "Set up CI/CD pipeline",
    status: Status.NotStarted,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 13,
    title: "Test new feature deployment",
    status: Status.InProgress,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 14,
    title: "Debug performance issues",
    status: Status.Completed,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 15,
    title: "Create marketing email template",
    status: Status.InProgress,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 16,
    title: "Write unit tests for authentication",
    status: Status.NotStarted,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 17,
    title: "Optimize frontend rendering",
    status: Status.Completed,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 18,
    title: "Update dependency versions",
    status: Status.Completed,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 19,
    title: "Research competitor products",
    status: Status.InProgress,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 20,
    title: "Draft feature roadmap",
    status: Status.Completed,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 21,
    title: "Create onboarding guide",
    status: Status.InProgress,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 22,
    title: "Prepare client presentation",
    status: Status.Completed,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 23,
    title: "Configure analytics tracking",
    status: Status.InProgress,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 24,
    title: "Conduct code review session",
    status: Status.Completed,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 25,
    title: "Fix mobile responsiveness issues",
    status: Status.NotStarted,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 26,
    title: "Improve error handling",
    status: Status.Completed,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 27,
    title: "Set up monitoring alerts",
    status: Status.InProgress,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 28,
    title: "Design new logo",
    status: Status.InProgress,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 29,
    title: "Analyze customer feedback",
    status: Status.Completed,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 30,
    title: "Write blog post on best practices",
    status: Status.NotStarted,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 31,
    title: "Document REST API endpoints",
    status: Status.InProgress,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 32,
    title: "Refactor checkout flow",
    status: Status.NotStarted,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 33,
    title: "Optimize image loading",
    status: Status.Completed,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 34,
    title: "Update security policies",
    status: Status.NotStarted,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 35,
    title: "Develop user profile page",
    status: Status.Completed,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 36,
    title: "Fix broken links in footer",
    status: Status.InProgress,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 37,
    title: "Set up automated email responses",
    status: Status.Completed,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 38,
    title: "Improve site accessibility",
    status: Status.InProgress,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 39,
    title: "Create A/B test experiment",
    status: Status.InProgress,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 40,
    title: "Conduct usability testing",
    status: Status.NotStarted,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 41,
    title: "Write post-mortem for outage",
    status: Status.Completed,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 42,
    title: "Fix pagination issues",
    status: Status.NotStarted,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 43,
    title: "Build dashboard charts",
    status: Status.InProgress,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 44,
    title: "Write test cases for search functionality",
    status: Status.InProgress,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 45,
    title: "Improve onboarding flow",
    status: Status.InProgress,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 46,
    title: "Optimize SQL queries",
    status: Status.Completed,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 47,
    title: "Deploy new microservice",
    status: Status.InProgress,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 48,
    title: "Fix UI inconsistencies",
    status: Status.NotStarted,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 49,
    title: "Update payment gateway integration",
    status: Status.InProgress,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 50,
    title: "Investigate slow API response times",
    status: Status.InProgress,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 51,
    title: "Prepare for product launch",
    status: Status.InProgress,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 52,
    title: "Write user documentation",
    status: Status.Completed,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 53,
    title: "Update README file",
    status: Status.NotStarted,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 54,
    title: "Fix session expiration bug",
    status: Status.InProgress,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 55,
    title: "Develop chat feature",
    status: Status.Completed,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 56,
    title: "Research AI integration",
    status: Status.NotStarted,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 57,
    title: "Improve website SEO",
    status: Status.Completed,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 58,
    title: "Analyze error logs",
    status: Status.InProgress,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 59,
    title: "Redesign settings page",
    status: Status.Completed,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 60,
    title: "Enhance form validation",
    status: Status.InProgress,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 61,
    title: "Update email templates",
    status: Status.NotStarted,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 62,
    title: "Set up feature flags",
    status: Status.NotStarted,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 63,
    title: "Fix typos in UI copy",
    status: Status.InProgress,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 64,
    title: "Refactor old legacy code",
    status: Status.NotStarted,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 65,
    title: "Prepare training slides",
    status: Status.InProgress,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 66,
    title: "Create FAQ section",
    status: Status.Completed,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 67,
    title: "Fix timezone issues",
    status: Status.NotStarted,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 68,
    title: "Add 2FA authentication",
    status: Status.NotStarted,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 69,
    title: "Implement search autocomplete",
    status: Status.Completed,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 70,
    title: "Improve cache strategy",
    status: Status.Completed,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 71,
    title: "Update terms of service",
    status: Status.Completed,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 72,
    title: "Research new frontend framework",
    status: Status.Completed,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 73,
    title: "Enhance error messages",
    status: Status.InProgress,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 74,
    title: "Fix memory leak issue",
    status: Status.NotStarted,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 75,
    title: "Develop new admin panel",
    status: Status.InProgress,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 76,
    title: "Review customer support tickets",
    status: Status.Completed,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 77,
    title: "Run load tests",
    status: Status.Completed,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 78,
    title: "Write Cypress tests",
    status: Status.Completed,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 79,
    title: "Create interactive tutorial",
    status: Status.InProgress,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 80,
    title: "Fix API CORS issues",
    status: Status.Completed,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 81,
    title: "Enhance keyboard navigation",
    status: Status.Completed,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 82,
    title: "Update user avatars",
    status: Status.InProgress,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 83,
    title: "Test backup recovery",
    status: Status.NotStarted,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 84,
    title: "Update mobile app version",
    status: Status.NotStarted,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 85,
    title: "Monitor server logs",
    status: Status.InProgress,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 86,
    title: "Fix infinite scroll bug",
    status: Status.InProgress,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 87,
    title: "Improve site speed",
    status: Status.InProgress,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 88,
    title: "Write migration script",
    status: Status.Completed,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 89,
    title: "Develop feature toggles",
    status: Status.Completed,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 90,
    title: "Refactor modal components",
    status: Status.InProgress,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 91,
    title: "Conduct A11y audit",
    status: Status.Completed,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 92,
    title: "Test WebSocket connections",
    status: Status.NotStarted,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 93,
    title: "Optimize database indexing",
    status: Status.Completed,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 94,
    title: "Fix missing translations",
    status: Status.InProgress,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 95,
    title: "Investigate 500 errors",
    status: Status.Completed,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 96,
    title: "Update dark mode styling",
    status: Status.Completed,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 97,
    title: "Review legal compliance",
    status: Status.InProgress,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 98,
    title: "Write changelog updates",
    status: Status.Completed,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 99,
    title: "Deploy security patches",
    status: Status.InProgress,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 100,
    title: "Refactor Redux state",
    status: Status.Completed,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 101,
    title: "Fix sidebar navigation",
    status: Status.InProgress,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 102,
    title: "Improve touch gestures",
    status: Status.InProgress,
    priority: Priority.Medium,
    customFields: {}
  },
  {
    id: 103,
    title: "Update typography guidelines",
    status: Status.NotStarted,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 104,
    title: "Test push notifications",
    status: Status.NotStarted,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 105,
    title: "Fix dropdown positioning",
    status: Status.NotStarted,
    priority: Priority.Low,
    customFields: {}
  },
  {
    id: 106,
    title: "Develop new analytics dashboard",
    status: Status.Completed,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 107,
    title: "Reduce bundle size",
    status: Status.InProgress,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 108,
    title: "Refactor date parsing functions",
    status: Status.InProgress,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 109,
    title: "Improve modal animations",
    status: Status.InProgress,
    priority: Priority.Urgent,
    customFields: {}
  },
  {
    id: 110,
    title: "Run penetration tests",
    status: Status.NotStarted,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 111,
    title: "Implement JWT authentication",
    status: Status.InProgress,
    priority: Priority.High,
    customFields: {}
  },
  {
    id: 112,
    title: "Improve logging strategy",
    status: Status.InProgress,
    priority: Priority.None,
    customFields: {}
  },
  {
    id: 113,
    title: "Optimize Redis caching",
    status: Status.NotStarted,
    priority: Priority.High,
    customFields: {}
  },
];
