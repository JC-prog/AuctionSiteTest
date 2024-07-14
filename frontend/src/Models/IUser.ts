interface IUser {
    id?: number,
    username?: string,
    gender?: string;
    email?: string;
    address?: string; 
    contactNumber?: string; 
    role?: string;
    createdAt?: Date;
}

export default IUser