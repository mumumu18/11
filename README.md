# Your Band - Mental Wellness Companion

This is a Vite-based React application for "Your Band", a mental wellness companion app.

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- `npm`, `yarn`, or `pnpm` package manager

### Installation

1. Clone the repository.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Environment Variables

For local development, create a `.env.local` file in the root of the project and add your Gemini API key:

```
VITE_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

For deployment on Netlify or Vercel, add this as an environment variable in the project settings.

### Running the Development Server

To run the app locally, use the following command:

```bash
npm run dev
```

This will start the development server, typically at `http://localhost:5173`.

## Deployment

This project is configured for easy deployment on platforms like Netlify or Vercel.

### Netlify Deployment Steps

1. **Push to Git**: Push your code to a GitHub, GitLab, or Bitbucket repository.
2. **Import Project**: On the Netlify dashboard, import the Git repository.
3. **Configure Build**: Netlify should auto-detect the settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. **Configure Environment Variable**:
   - In your Netlify site's settings, go to "Build & deploy" > "Environment".
   - Add a variable named `VITE_API_KEY` and set its value to your Gemini API key.
5. **Deploy**: Trigger a new deployment. Netlify will build and host your application.