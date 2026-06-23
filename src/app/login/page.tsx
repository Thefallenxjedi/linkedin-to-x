import LoginForm from "@/components/LoginForm";
import { normalizeRedirectPath } from "@/lib/firebase/authErrors";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;
  const redirectTo = normalizeRedirectPath(next, "/dashboard");

  return <LoginForm error={error} redirectTo={redirectTo} />;
}
