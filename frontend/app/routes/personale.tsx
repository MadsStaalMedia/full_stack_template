import { PersonnelTable } from "~/components/personnelTable";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Personale" },
    { name: "description", content: "Personaleoversigt" },
  ];
};

export default function Personnel() {
    return <PersonnelTable />
};