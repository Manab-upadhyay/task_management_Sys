import { useSession } from "next-auth/react";

export default function UserProfile() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <div>
          <h2>Welcome, {session.user?.name}!</h2>
          <p>Email: {session.user?.email}</p>
          {session.user?.image && (
            <img src={session.user.image} alt="User profile" />
          )}
        </div>
      ) : (
        <p>You are not signed in</p>
      )}
    </div>
  );
}
