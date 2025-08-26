export default function AboutPage() {
  return (
    <section className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-2">About</h1>

      <p>
        <strong>Name:</strong> Ezaz <br />
        <strong>Student Number:</strong> 22016197
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">How to use this website</h2>
      <p>
        This site will generate HTML + JavaScript with inline CSS that you can paste
        into a file (e.g., <code>Hello.html</code>) and open directly in a browser.
      </p>

      <div className="aspect-video mt-4">
        {/* Replace src with your real walkthrough video link later */}
        <iframe
          title="Walkthrough Video"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="w-full h-full rounded"
        />
      </div>
    </section>
  );
}
