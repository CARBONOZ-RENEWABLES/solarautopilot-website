#!/bin/bash

echo "🔧 Installing required dependencies..."

# Install only the essential dependencies
npm install next@^14.0.0 react@^18.0.0 react-dom@^18.0.0 framer-motion@^10.0.0 lucide-react@^0.300.0

# Install dev dependencies
npm install -D @types/node@^20.0.0 @types/react@^18.0.0 @types/react-dom@^18.0.0 typescript@^5.0.0 tailwindcss@^3.0.0 autoprefixer@^10.0.0 postcss@^8.0.0 eslint@^8.0.0 eslint-config-next@^14.0.0

echo "✅ Dependencies installed successfully!"
echo ""
echo "Next steps:"
echo "1. Run 'npm run dev' to start development"
echo "2. Visit http://localhost:3000 to see your website"
echo "3. Visit http://localhost:3000/admin to manage content"