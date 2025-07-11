import Cookie from "cookie-universal";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireBack() {
    const cookie = Cookie();
    const token = cookie.get("charity");

    return token ? window.history.back() : <Outlet />;
}