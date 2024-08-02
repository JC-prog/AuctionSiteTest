interface User {
    id: number;
    username: string;
    email: string;
    contactNumber: string;
    address: string;
    accountType: string;
    status: string;
    isActive: boolean;
    role: string;
    createdAt: Date
}

export default User