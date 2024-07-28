# EmpowerLearn

**Education Platform for Underprivileged Communities**

## Overview
EmpowerLearn aims to bridge the educational gap for learners in underprivileged communities by providing quality educational content, personalized learning experiences, live tutoring, and community support. The platform is built using the MERN stack and integrated with various Azure services.

## Features
- **Multilingual Support**: The platform supports multiple languages to cater to diverse learners.
- **Automated Notifications**: Users receive notifications for course updates, new content, live session reminders, and other important events.
- **Analytics Dashboard**: Detailed analytics for students, tutors, and admins to track performance and engagement.

## User Roles
### Student
- Create an account and log in securely.
- Browse, search, and enroll in courses.
- View course content including videos, documents, and interactive materials.
- Track progress, participate in live tutoring sessions, download course materials, interact in community forums, and receive certifications.

### Tutor
- Create an account and log in.
- Create and manage courses, schedule and conduct live tutoring sessions, interact in community forums, track student progress, and manage assignments.

### Admin
- Manage user accounts, course content, categories, platform performance, and user feedback.

## Technical Requirements
- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Azure Services**: 
  - Azure Communication Services
  - Azure Media Services
  - Azure Cognitive Services
  - Azure SQL Database
  - Azure App Services
  - Azure Blob Storage
  - Azure Active Directory B2C
  - Azure Logic Apps

## User Stories
### Student
- As a student, I want to create an account so that I can access the platform's features.
- As a student, I want to log in and log out securely so that my data is protected.
- As a student, I want to browse and search for courses so that I can find content relevant to my learning goals.
- As a student, I want to enroll in courses so that I can start learning.
- As a student, I want to view course content, including videos, documents, and interactive materials, so that I can learn effectively.
- As a student, I want to track my progress so that I know how far I have advanced in each course.
- As a student, I want to participate in live tutoring sessions so that I can get help from tutors in real-time.
- As a student, I want to download course materials for offline access so that I can study without an internet connection.
- As a student, I want to interact with peers and tutors in community forums so that I can ask questions and share knowledge.
- As a student, I want to receive certifications upon course completion so that I can improve my job prospects.

### Tutor
- As a tutor, I want to create an account and log in so that I can access the platform's tutor features.
- As a tutor, I want to create and manage courses so that I can provide educational content to students.
- As a tutor, I want to schedule and conduct live tutoring sessions so that I can help students in real-time.
- As a tutor, I want to interact with students in community forums so that I can support their learning journey.
- As a tutor, I want to track student progress so that I can provide personalized feedback and support.
- As a tutor, I want to manage and grade assignments so that I can evaluate student performance.

### Admin
- As an admin, I want to manage user accounts so that I can ensure only authorized users have access to the platform.
- As an admin, I want to manage course content and categories so that the platform remains organized and up-to-date.
- As an admin, I want to monitor platform performance and usage so that I can ensure a smooth and efficient user experience.
- As an admin, I want to handle user reports and feedback so that I can address issues and improve the platform.

## User Interface Mockups
- **Homepage**: Overview of the platform, featured courses, and testimonials.
- **Course Page**: Course description, content list, enrollment button, and progress tracker.
- **User Dashboard**: Personalized dashboard showing enrolled courses, progress, upcoming sessions, and notifications.
- **Admin Dashboard**: Tools for managing users, courses, content, and monitoring platform analytics.
- **Payment Page**: Secure payment gateway for any premium features or certifications.

## Detailed Functionality
- **Authentication & Authorization**: User registration, login, role-based access control.
- **Course Management**: Course creation, enrollment, content delivery.
- **Live Tutoring**: Scheduling sessions, real-time interaction, session recording.
- **Community Interaction**: Forums, Q&A section.
- **Offline Access**: Content download, progress sync.
- **Notifications & Alerts**: Email and in-app notifications.
- **Certification**: Assessment, certification issuance.
- **Analytics**: Student, tutor, and admin analytics.

## Security Considerations
- **Data Encryption**: Encrypt sensitive data both in transit and at rest.
- **Secure Coding Practices**: Follow best practices to prevent common vulnerabilities (e.g., SQL injection, XSS).
- **Regular Audits**: Conduct security audits and vulnerability assessments.

## Development Timeline
1. **Phase 1**: Planning & Design (4-6 hours)
2. **Phase 2**: Backend Development (4-6 hours)
3. **Phase 3**: Frontend Development (4-6 hours)
4. **Phase 4**: Integration & Testing (3-4 hours)
5. **Phase 5**: Deployment & Monitoring (2-3 hours)
6. **Phase 6**: Maintenance & Updates (Ongoing)

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/Massamba505/EmpowerLearn.git
    cd EmpowerLearn
    ```
2. Install dependencies:
    ```sh
    npm install
    cd client
    npm install
    ```
3. Set up environment variables for both backend and frontend.

4. Run the development server:
    ```sh
    cd ..
    npm run dev
    ```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

