import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-[55vh] items-center justify-center p-4 select-none animate-fade-in">
      <Card className="max-w-md w-full text-center rounded-xl">
        <CardHeader className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 mb-4">
            <Compass className="h-8 w-8 text-primary" aria-hidden="true" />
          </div>
          <CardTitle className="font-semibold text-xl tracking-tight">Route Not Found</CardTitle>
          <CardDescription className="text-muted-foreground/80 mt-2 leading-relaxed">
            The requested path does not exist, or you lack authorization clearance to view it.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center mt-2">
          <Link href="/dashboard">
            <Button className="cursor-pointer">Return to Dashboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
