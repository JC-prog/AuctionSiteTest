import React from 'react'

// Interface
interface User {
    userName: string;
    userPassword: string;
    userNumber: string;
    userAddress: string;
    userEmail: string;
    isActive: boolean;
    isAdmin: boolean;
}

interface UserProps {
    user: User;
}

const ProfileComponent: React.FC<UserProps> = ( {user} ) => {
  return (
    <>
        <div>
            <h2>Profile</h2>
            <p>Personal Information</p>
            <hr></hr>
            <div>
                <h3>Name</h3>
                <p>{ user.userName }</p>
            </div>

            <div>
                <h3>Email</h3>
                <p>{ user.userEmail}</p>
            </div>

            <div>
                <h3>Address</h3>
                <p>{ user.userAddress }</p>
            </div>
            
        </div>
    </>
  )
}

export default ProfileComponent