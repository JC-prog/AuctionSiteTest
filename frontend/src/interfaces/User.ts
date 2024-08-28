interface User {
    id: number;
    username: string | null | undefined;
    password: string;
    email: string;
    gender: string;
    contactNumber: string;
    address: string;
    bannerPhoto: string,
    profilePhoto: string,
    accountType: string;
    status: string;
    isActive: boolean;
    role: string;
    createdAt: Date
}

export default User