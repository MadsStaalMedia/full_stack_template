import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("personale", "routes/personale.tsx")
] satisfies RouteConfig;
