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

Create a `.env.local` file in the root of the project and add your Gemini API key:

```
VITE_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

### Running the Development Server

To run the app locally, use the following command:

```bash
npm run dev
```

This will start the development server, typically at `http://localhost:5173`.

## Deployment

This project is configured for easy deployment on platforms like Vercel or Netlify.

### Vercel Deployment Steps

1. **Push to Git**: Push your code to a GitHub, GitLab, or Bitbucket repository.
2. **Import Project**: On the Vercel dashboard, import the Git repository.
3. **Configure Environment Variable**:
   - In your Vercel project's settings, go to "Environment Variables".
   - Add a variable named `VITE_API_KEY` and set its value to your Gemini API key.
4. **Deploy**: Vercel will automatically detect the Vite configuration and deploy your application.
