import ProfileHeader from '../_components/ProfileHeader';
import ProfileMenu from '../_components/ProfileMenu';
import ProfileSignOut from '../_components/ProfileSignOut';
import UserProfileCard from '../_components/UserProfileCard';
import ProtectedRoute from '../_components/auth/protactRoute';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <ProfileHeader />
        <div className="px-4 pb-20">
          <UserProfileCard />
          <ProfileMenu />
          <ProfileSignOut />
        </div>
      </div>
    </ProtectedRoute>
  );
}
