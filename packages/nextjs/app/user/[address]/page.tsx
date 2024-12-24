import ProfileContent from "./_components/ProfileContent";
import { findUserByAddress } from "~~/services/database/repositories/users";

const ProfilePage = async ({ params }: { params: { address: string } }) => {
  const users = await findUserByAddress(params.address);
  const user = users[0];

  if (!user) {
    return (
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-2xl font-bold">User not found</h1>
      </div>
    );
  }

  return <ProfileContent user={user} />;
};

export default ProfilePage;
