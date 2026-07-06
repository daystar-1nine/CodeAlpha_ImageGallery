import { PageWrapper } from "@/components/layout/PageWrapper";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <PageWrapper className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-9xl font-black text-primary/10 tracking-tighter">404</h1>
      <h2 className="text-3xl font-bold -mt-12 mb-4">Page not found</h2>
      <p className="text-muted-foreground text-lg mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8")}>
        Go Home
      </Link>
    </PageWrapper>
  );
}
