import LoginForm from "@/components/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;
  const redirectTo = next?.startsWith("/") ? next : "/dashboard";

  return <LoginForm error={error} redirectTo={redirectTo} />;
}
