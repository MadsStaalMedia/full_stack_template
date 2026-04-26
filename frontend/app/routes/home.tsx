import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { PersonnelTable } from "~/components/personnelTable";
import { PersonnelAdd } from "~/components/createStaff";
import { GroupAdd } from "~/components/createGroup";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <GroupAdd />;
}
