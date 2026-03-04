import { toast } from "react-toastify";
import { profileAPI } from "../../services/api";

function ProfileTab({ user, data, onOpenEditProfile }) {
  const handleEditClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const profile = await profileAPI.getProfile(token);
      if (profile) {
        onOpenEditProfile(profile, { ...profile, accountPassword: "" });
        return;
      }
    } catch (error) {
      toast.error("Lỗi tải profile: " + error.message);
    }
    const currentAccount =
      data.systemAccounts.find((acc) => acc.accountID === user?.id) || user;
    if (currentAccount) {
      onOpenEditProfile(currentAccount, {
        ...currentAccount,
        accountPassword: "",
      });
    }
  };

  return (
    <div className="management-tab profile-tab">
      <div className="tab-header">
        <h2>Quản lý Profile</h2>
        <button className="btn-primary" onClick={handleEditClick}>
          ✏️ Chỉnh sửa Profile
        </button>
      </div>
      <div className="profile-info">
        <div className="profile-card">
          <div className="profile-avatar">
            <span>{user?.accountName?.charAt(0) || "S"}</span>
          </div>
          <div className="profile-details">
            <h3>{user?.accountName || "Staff"}</h3>
            <p className="profile-email">{user?.accountEmail || ""}</p>
            <p className="profile-role">
              <span className="role-badge role-staff">Staff</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTab;
