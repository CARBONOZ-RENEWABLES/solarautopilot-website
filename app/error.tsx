export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">500</h1>
        <h2 className="text-2xl font-semibold mb-4">Server Error</h2>
        <p className="text-text-secondary mb-8">Something went wrong on our end.</p>
        <a href="/" className="btn-primary">
          Go Home
        </a>
      </div>
    </div>
  )
}