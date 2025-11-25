import { lazy } from "react";

// Auth pages
export const Login = lazy(() => import("../../pages/auth/login"));
export const Register = lazy(() => import("../../pages/auth/register"));
