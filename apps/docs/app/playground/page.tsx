import { PlaygroundClient } from "./_components/PlaygroundClient";

export const metadata = {
  title: "Playground | DesignForge",
  description: "Live component playground with Monaco editor, instant preview, and console.",
};

export default function PlaygroundPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <PlaygroundClient />
    </div>
  );
}
