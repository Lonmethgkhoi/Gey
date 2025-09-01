import HexBackground from "../components/HexBackground";
import Card from "../components/Card";

export default function Home() {
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <HexBackground />
      <Card title="Get Key">
        <div className="text-center">
          {/* Turnstile widget */}
          <div className="mb-4">
            <script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              async
              defer
            ></script>
            <div
              className="cf-turnstile"
              data-sitekey="YOUR_SITE_KEY"
              data-theme="dark"
            ></div>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow">
            Get Key
          </button>
        </div>
      </Card>
    </div>
  );
}
