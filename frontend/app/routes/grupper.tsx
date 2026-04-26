import type { Route } from "./+types/home";
import { GroupTable } from "~/components/groupTable";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Grupper" },
    { name: "description", content: "Gruppeoversigt" },
  ];
};

export default function Personnel() {
    return <GroupTable />
};