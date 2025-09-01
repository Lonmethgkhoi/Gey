import HexBackground from "../components/HexBackground";
import Card from "../components/Card";

export default function Extend() {
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <HexBackground />
      <Card title="Extend Key">
        <div className="text-center space-y-4">
          <p>Key hiện tại còn hạn đến: <span className="text-green-400">2025-09-02 12:00</span></p>
          <button className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-lg shadow">
            Extend Key
          </button>
        </div>
      </Card>
    </div>
  );
    }
