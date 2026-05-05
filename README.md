# EventBreakers

EventBreakers is a full-stack event management platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to browse events, register for them, and receive email notifications. Administrators can create, edit, and manage events through a dedicated dashboard.

## Interesting Techniques

- **WebGL Shaders**: The [client/src/components/Aurora.jsx](client/src/components/Aurora.jsx) component uses [OGL](https://github.com/oframe/ogl) to render an animated aurora background effect using custom GLSL fragment shaders with simplex noise generation. This creates the flowing, colorful aurora effect on the landing page.
- **JWT Authentication with HTTP-Only Cookies**: The server uses [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) to sign tokens, stored in HTTP-only cookies via [cookie-session](https://www.npmjs.com/package/cookie-session). This approach helps prevent XSS attacks since JavaScript cannot access the token.
- **Google OAuth2**: The project integrates [passport-google-oauth20](https://www.npmjs.com/package/passport-google-oauth20) for social login, handling the OAuth flow with serializing/deserializing users to/from sessions.
- **File Upload to Cloudinary**: Events support banner images uploaded directly to Cloudinary using [multer](https://www.npmjs.com/package/multer) and [multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary).
- **Email Notifications**: Confirmation emails are sent using [nodemailer](https://nodemailer.com/) with customizable HTML templates.

## Non-Obvious Technologies

- **OGL**: A lightweight WebGL library used in [client/src/components/Aurora.jsx](client/src/components/Aurora.jsx). It's significantly smaller than Three.js while providing low-level WebGL abstractions. [OGL on GitHub](https://github.com/oframe/ogl)
- **Tailwind CSS v4**: The client uses Tailwind v4 with the [Vite plugin](https://tailwindcss.com/docs/guides/vite), which uses a CSS-first configuration approach rather than the traditional `tailwind.config.js`.
- **Framer Motion**: Used for animations in the client, providing declarative transitions and gesture handling. [Framer Motion](https://www.framer.com/motion/)
- **React Hook Form**: Handles form state and validation, integrated with the component for performance. [React Hook Form](https://react-hook-form.com/)
- **React Router v7**: The latest version of React Router used for routing with data layer features. [React Router](https://reactrouter.com/)

## External Libraries

- [React 19](https://react.dev/)
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Passport.js](https://www.passportjs.org/)
- [Vite](https://vitejs.dev/)
- [Lucide React](https://lucide.dev/) (icons)
- [React Toastify](https://fkhadra.github.io/react-toastify/) (notifications)
- [Axios](https://axios-http.com/) (HTTP client)
- [Bcrypt](https://bcryptjs.com/) (password hashing)
- [Cloudinary](https://cloudinary.com/) (image storage)
- [Nodemailer](https://nodemailer.com/) (email sending)
- [JWT](https://jwt.io/) (tokens)

## Project Structure

```
EventBreakers/
├── client/                      # React frontend
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── adminPages/           # Admin dashboard pages
│   │   ├── assets/              # Images, fonts, icons
│   │   ├── components/          # Reusable components (Aurora, Navbar)
│   │   ├── pages/               # Public pages (Landing, Login, Signup)
│   │   ├── provider/            # React context providers
│   │   ├── routes/              # Router configuration with protected routes
│   │   ├── index.css            # Tailwind directives
│   │   ├── App.jsx              # Root component
│   │   └── main.jsx             # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Express backend
│   ├── controllers/             # Route handlers
│   ├── db/                      # Database connection
│   ├── mailTemplates/           # Email HTML templates
│   ├── middlewares/             # Custom middleware (auth)
│   ├── models/                  # Mongoose schemas (User, Event, Registration)
│   ├── routes/                  # API routes
│   ├── utils/                   # Utilities (Cloudinary, Multer, Nodemailer, Passport)
│   ├── package.json
│   └── server.js                # Express app entry point
│
└── README.md
```

### Notable Directories

- [client/src/components/](client/src/components/): Contains Aurora.jsx with WebGL shaders and Navbar.jsx for navigation.
- [client/src/adminPages/](client/src/adminPages/): Admin-only pages for creating, editing, and managing events.
- [server/models/](server/models/): Mongoose schemas defining database collections for users, events, and registrations.
- [server/utils/](server/utils/): Helper modules for file uploads, email sending, and authentication strategies.
- [server/mailTemplates/](server/mailTemplates/): HTML templates for event registration and joining confirmations sent via Nodemailer.