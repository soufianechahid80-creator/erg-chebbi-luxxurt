import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/brand/Logo";

export default function AdminLoginPage() {
  const session = getAdminSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-[#09080b] py-20">
      <Container className="max-w-xl">
        <div className="mb-8 flex justify-center">
          <Logo href="/en" />
        </div>
        <Card>
          <h1 className="font-display text-4xl text-ivory">Owner access</h1>
          <p className="mt-4 text-sm leading-7 text-[#d0c4ae]">
            This area is private and intended only for the business owner.
          </p>
          <form action="/api/admin/login" method="post" className="mt-8 grid gap-5">
            <label className="grid gap-2 text-sm text-[#d7cbb6]">
              Username
              <input
                name="username"
                className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-ivory"
                required
              />
            </label>
            <label className="grid gap-2 text-sm text-[#d7cbb6]">
              Password
              <input
                type="password"
                name="password"
                className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-ivory"
                required
              />
            </label>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-full bg-dune px-5 text-sm font-medium text-ink"
            >
              Sign in
            </button>
          </form>
        </Card>
      </Container>
    </div>
  );
}
