import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-32">
      <Container className="text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-sand">404</p>
        <h1 className="mt-6 font-display text-5xl text-ivory">Page not found</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#d0c4ae]">
          The desert route you were looking for does not exist. Return to the homepage and continue from there.
        </p>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/en">Back to home</ButtonLink>
        </div>
      </Container>
    </div>
  );
}
