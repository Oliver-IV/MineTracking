import { HOST_NAME } from "@/configs/configs";
import type { LoginDto } from "@/types/back/authDto/login.dto";
import type { RegisterUserDto } from "@/types/back/authDto/register-user.dto";

async function POTSlogin(loginDto: LoginDto) {
    try {
        const response = await fetch(`${HOST_NAME}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginDto),
        });
        if (response.status === 401) {
            throw new Error("Wrong Credentials");
        }
        if (!response.ok) {
            throw new Error("Error logging in");
        }
        return response.json();
    } catch (error) {
        console.error("Error: ", error) ;
        throw error;
    }
}

async function POSTregister(registerUserDto: RegisterUserDto): Promise<any> {
    try {
        const response = await fetch(`${HOST_NAME}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                credentials: "include",
            },
            body: JSON.stringify(registerUserDto),
        });
        if (!response.ok) {
            throw new Error("Error logging in");
        }
        return response.json();
    } catch (error) {
        console.error("Error: ", error) ;
        throw error;
    }
}

async function POSTlogout() {
    try {
        const response = await fetch(`${HOST_NAME}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Error logging out");
        }
        return response.json();
    } catch (error) {
        console.error("Error: ", error) ;
        throw error;
    }
}

export { POTSlogin, POSTregister, POSTlogout };