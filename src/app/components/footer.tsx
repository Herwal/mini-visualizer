export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600">
            <span>Powered by</span>
            <span className="font-semibold">Next.js</span>
            <span>•</span>
            <span className="font-semibold">React</span>
            <span>•</span>
            <span className="font-semibold">TypeScript</span>
            <span>•</span>
            <span className="font-semibold">Tailwind CSS</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <a
              href="mailto:herwal20@gmail.com"
              className="hover:text-gray-900 transition-colors"
            >
              herwal20@gmail.com
            </a>
            <span>•</span>
            <a
              href="https://github.com/Herwal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
