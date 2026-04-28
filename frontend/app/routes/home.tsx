import type { Route } from "./+types/home";
import { Landing } from "~/components/landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Persigt" },
    { name: "description", content: "Din oversigt over personalet" },
  ];
}

export default function Home() {
  return <Landing />;
}
