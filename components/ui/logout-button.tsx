"use client";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout", { method: "POST" });

            if (response.ok) {
                router.push("/");
                router.refresh();
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <button className="text-sm text-white/60" onClick={handleLogout}>
            Sign out
        </button>
    );
};

export default LogoutButton;
