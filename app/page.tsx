import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-6">
      <Link href="/dashboard" className="text-sm text-blue-600 underline">
        ダッシュボードへ
      </Link>
    </main>
  );
}
