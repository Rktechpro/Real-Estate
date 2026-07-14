export interface userDataInterface {
    id: string,
    email: string,
    fullname: string
}

export interface cookieOptions {
    httpOnly: boolean;
    maxAge: number;
    domain: string | undefined;
    secure: boolean;
    sameSite: "lax" | "strict" | "none";
}