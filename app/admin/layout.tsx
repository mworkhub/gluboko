export const metadata = {
  title: "Адмін-панель",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-cream-deep/40 font-sans">{children}</div>;
}
