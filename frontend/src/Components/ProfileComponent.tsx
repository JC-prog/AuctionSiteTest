import React from 'react';

// Interface
interface User {
    username: string;
    email: string;
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
                <p>{ user.username }</p>
            </div>

            <div>
                <h3>Email</h3>
                <p>{ user.email}</p>
            </div>
            
        </div>
    </>
  )
}

export default ProfileComponent