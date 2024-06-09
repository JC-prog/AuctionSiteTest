import React from 'react'

// Interface
interface User {
    uName: String;
    uMail: String;
    uNum: String;
    uAddress: String;
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
                <p>{ user.uName }</p>
            </div>

            <div>
                <h3>Email</h3>
                <p>{ user.uMail}</p>
            </div>

            <div>
                <h3>Address</h3>
                <p>{ user.uAddress }</p>
            </div>
            
        </div>
    </>
  )
}

export default ProfileComponent