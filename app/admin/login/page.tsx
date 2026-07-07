import { LoginForm } from "@/components/admin/LoginForm";
import { LogoMark } from "@/components/shared/LogoMark";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <LogoMark size="lg" />
          <h1 className="mt-4 font-display text-xl text-ink">Адмін-панель ГЛИБОКО</h1>
          <p className="mt-1 text-sm text-slate">Увійдіть, щоб переглянути заявки</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
