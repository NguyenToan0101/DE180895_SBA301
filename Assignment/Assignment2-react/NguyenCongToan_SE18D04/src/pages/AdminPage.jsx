import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import AccountForm from "../components/forms/AccountForm";
import CategoryForm from "../components/forms/CategoryForm";
import NewsForm from "../components/forms/NewsForm";
import TagForm from "../components/forms/TagForm";
import ProfileForm from "../components/forms/ProfileForm";
import useAuth from "../stores/useAuth";
import { useAdminData } from "../hooks/useAdminData";
import {
  DashboardTab,
  UsersTab,
  CategoryTab,
  NewsTab,
  TagsTab,
  ProfileTab,
  HistoryTab,
} from "./admin";
import {
  accountAPI,
  categoryAPI,
  newsAPI,
  tagAPI,
  profileAPI,
} from "../services/api";
import "../styles/AdminPage.css";

function AdminPage() {
  const { user } = useAuth();
  const isAdmin = user?.accountRole === 1;
  const isStaff = user?.accountRole === 2;
  const [activeTab, setActiveTab] = useState("dashboard");

  const {
    data,
    loading,
    loadData,
    searchTerm,
    setSearchTerm,
    getCategoryName,
    getAccountName,
    getNewsTags,
    filterData,
    getFilteredData,
  } = useAdminData(user, isAdmin, activeTab);

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [itemToDelete, setItemToDelete] = useState(null);
  const [staffNews, setStaffNews] = useState([]);

  useEffect(() => {
    const loadStaffNews = async () => {
      if (activeTab === "history" && user?.id && isStaff) {
        try {
          const token = localStorage.getItem("token");
          const news = await newsAPI.getByCreator(user.id, token);
          setStaffNews(news || []);
        } catch (error) {
          setStaffNews(
            data.newsArticles.filter((article) => article.createdByID === user.id)
          );
        }
      }
    };
    loadStaffNews();
  }, [activeTab, user?.id, isStaff, data.newsArticles]);

  const filteredData = getFilteredData();

  const closeModal = () => {
    setModalOpen(false);
    setFormData({});
    setFormErrors({});
  };

  // --- Accounts CRUD ---
  const handleCreateAccount = () => {
    setModalMode("create");
    setFormData({});
    setFormErrors({});
    setModalOpen(true);
  };
  const handleEditAccount = (account) => {
    setModalMode("edit");
    setCurrentItem(account);
    setFormData({ ...account });
    setFormErrors({});
    setModalOpen(true);
  };
  const handleDeleteAccount = async (accountID) => {
    try {
      const token = localStorage.getItem("token");
      const canDelete = await accountAPI.checkCanDelete(accountID, token);
      if (!canDelete.canDelete) {
        toast.error("Không thể xóa tài khoản này. Tài khoản đã tạo tin tức.");
        return;
      }
      setItemToDelete({ type: "account", id: accountID });
      setConfirmOpen(true);
    } catch (error) {
      toast.error("Lỗi kiểm tra: " + error.message);
    }
  };
  const validateAccount = () => {
    const errors = {};
    if (!formData.accountName?.trim()) errors.accountName = "Tên tài khoản là bắt buộc";
    if (!formData.accountEmail?.trim()) errors.accountEmail = "Email là bắt buộc";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.accountEmail))
      errors.accountEmail = "Email không hợp lệ";
    if (!formData.accountPassword?.trim()) errors.accountPassword = "Mật khẩu là bắt buộc";
    if (!formData.accountRole) errors.accountRole = "Vai trò là bắt buộc";
    return errors;
  };
  const handleSaveAccount = async () => {
    const errors = validateAccount();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const accountData = {
        accountName: formData.accountName,
        accountEmail: formData.accountEmail,
        accountPassword: formData.accountPassword,
        accountRole: parseInt(formData.accountRole),
      };
      if (modalMode === "create") {
        await accountAPI.create(accountData, token);
        toast.success("Thêm tài khoản thành công!");
      } else {
        await accountAPI.update(currentItem.accountID, accountData, token);
        toast.success("Cập nhật tài khoản thành công!");
      }
      await loadData();
      closeModal();
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra");
    }
  };

  // --- Categories CRUD ---
  const handleCreateCategory = () => {
    setModalMode("create");
    setFormData({ isActive: true });
    setFormErrors({});
    setModalOpen(true);
  };
  const handleEditCategory = (category) => {
    setModalMode("edit");
    setCurrentItem(category);
    setFormData({ ...category });
    setFormErrors({});
    setModalOpen(true);
  };
  const handleDeleteCategory = async (categoryID) => {
    try {
      const token = localStorage.getItem("token");
      const canDelete = await categoryAPI.checkCanDelete(categoryID, token);
      if (!canDelete.canDelete) {
        toast.error("Không thể xóa danh mục này. Danh mục đã được sử dụng trong tin tức.");
        return;
      }
      setItemToDelete({ type: "category", id: categoryID });
      setConfirmOpen(true);
    } catch (error) {
      toast.error("Lỗi kiểm tra: " + error.message);
    }
  };
  const validateCategory = () => {
    const errors = {};
    if (!formData.categoryName?.trim()) errors.categoryName = "Tên danh mục là bắt buộc";
    return errors;
  };
  const handleSaveCategory = async () => {
    const errors = validateCategory();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const categoryData = {
        categoryName: formData.categoryName,
        categoryDescription: formData.categoryDescription || "",
        parentCategoryID: formData.parentCategoryID ? parseInt(formData.parentCategoryID) : null,
        isActive: formData.isActive !== false ? 1 : 0,
      };
      if (modalMode === "create") {
        await categoryAPI.create(categoryData, token);
        toast.success("Thêm danh mục thành công!");
      } else {
        await categoryAPI.update(currentItem.categoryID, categoryData, token);
        toast.success("Cập nhật danh mục thành công!");
      }
      await loadData();
      closeModal();
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra");
    }
  };

  // --- News CRUD ---
  const handleCreateNews = () => {
    setModalMode("create");
    setFormData({
      newsStatus: 1,
      tagIDs: [],
      createdByID: isStaff ? user?.id : undefined,
    });
    setFormErrors({});
    setModalOpen(true);
  };
  const handleEditNews = (article) => {
    setModalMode("edit");
    setCurrentItem(article);
    setFormData({ ...article, tagIDs: article.tagIDs || [] });
    setFormErrors({});
    setModalOpen(true);
  };
  const handleDeleteNews = (newsArticleID) => {
    setItemToDelete({ type: "news", id: newsArticleID });
    setConfirmOpen(true);
  };
  const validateNews = () => {
    const errors = {};
    if (!formData.newsTitle?.trim()) errors.newsTitle = "Tiêu đề là bắt buộc";
    if (!formData.headline?.trim()) errors.headline = "Headline là bắt buộc";
    if (!formData.newsContent?.trim()) errors.newsContent = "Nội dung là bắt buộc";
    if (!formData.categoryID) errors.categoryID = "Danh mục là bắt buộc";
    if (!formData.createdByID) errors.createdByID = "Người tạo là bắt buộc";
    if (formData.newsStatus === undefined || formData.newsStatus === "")
      errors.newsStatus = "Trạng thái là bắt buộc";
    return errors;
  };
  const handleSaveNews = async () => {
    const errors = validateNews();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const createdByID = isStaff ? user?.id : parseInt(formData.createdByID);
      const newsData = {
        newsTitle: formData.newsTitle,
        headline: formData.headline,
        newsContent: formData.newsContent,
        newsSource: formData.newsSource || "FUNews",
        categoryID: parseInt(formData.categoryID),
        newsStatus: parseInt(formData.newsStatus),
        createdByID: createdByID,
        tagIDs: (formData.tagIDs || []).map((id) => parseInt(id)),
      };
      if (modalMode === "create") {
        await newsAPI.create(newsData, token);
        toast.success("Thêm tin tức thành công!");
      } else {
        await newsAPI.update(currentItem.newsArticleID, newsData, token);
        toast.success("Cập nhật tin tức thành công!");
      }
      await loadData();
      closeModal();
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra");
    }
  };

  // --- Tags CRUD ---
  const handleCreateTag = () => {
    setModalMode("create");
    setFormData({});
    setFormErrors({});
    setModalOpen(true);
  };
  const handleEditTag = (tag) => {
    setModalMode("edit");
    setCurrentItem(tag);
    setFormData({ ...tag });
    setFormErrors({});
    setModalOpen(true);
  };
  const handleDeleteTag = (tagID) => {
    setItemToDelete({ type: "tag", id: tagID });
    setConfirmOpen(true);
  };
  const validateTag = () => {
    const errors = {};
    if (!formData.tagName?.trim()) errors.tagName = "Tên tag là bắt buộc";
    return errors;
  };
  const handleSaveTag = async () => {
    const errors = validateTag();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const tagData = {
        tagName: formData.tagName,
        note: formData.note || "",
      };
      if (modalMode === "create") {
        await tagAPI.create(tagData, token);
        toast.success("Thêm tag thành công!");
      } else {
        await tagAPI.update(currentItem.tagID, tagData, token);
        toast.success("Cập nhật tag thành công!");
      }
      await loadData();
      closeModal();
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra");
    }
  };

  // --- Profile ---
  const handleOpenEditProfile = (item, initialFormData) => {
    setModalMode("edit");
    setCurrentItem(item);
    setFormData(initialFormData);
    setFormErrors({});
    setModalOpen(true);
  };
  const handleSaveProfile = async () => {
    const errors = {};
    if (!formData.accountName?.trim()) errors.accountName = "Tên tài khoản là bắt buộc";
    if (!formData.accountEmail?.trim()) errors.accountEmail = "Email là bắt buộc";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.accountEmail))
      errors.accountEmail = "Email không hợp lệ";
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const profileData = {
        accountName: formData.accountName,
        accountEmail: formData.accountEmail,
      };
      if (formData.accountPassword?.trim()) profileData.accountPassword = formData.accountPassword;
      await profileAPI.updateProfile(profileData, token);
      const updatedUser = { ...user, accountName: formData.accountName, accountEmail: formData.accountEmail };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      await loadData();
      toast.success("Cập nhật profile thành công!");
      closeModal();
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra");
    }
  };

  // --- Render content by tab ---
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardTab
            user={user}
            isAdmin={isAdmin}
            data={data}
            setActiveTab={setActiveTab}
            getCategoryName={getCategoryName}
            getNewsTags={getNewsTags}
            onEditNews={handleEditNews}
          />
        );
      case "users":
        if (!isAdmin) {
          return (
            <div className="management-tab">
              <h2>Không có quyền truy cập</h2>
              <p>Chỉ Admin mới có thể quản lý tài khoản.</p>
            </div>
          );
        }
        return (
          <UsersTab
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filteredData={filteredData}
            onCreate={handleCreateAccount}
            onEdit={handleEditAccount}
            onDelete={handleDeleteAccount}
          />
        );
      case "category":
        if (!isStaff) {
          return (
            <div className="management-tab">
              <h2>Không có quyền truy cập</h2>
              <p>Chỉ Staff mới có thể quản lý danh mục.</p>
            </div>
          );
        }
        return (
          <CategoryTab
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filteredData={filteredData}
            getCategoryName={getCategoryName}
            onCreate={handleCreateCategory}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        );
      case "news":
        if (!isStaff) {
          return (
            <div className="management-tab">
              <h2>Không có quyền truy cập</h2>
              <p>Chỉ Staff mới có thể quản lý tin tức.</p>
            </div>
          );
        }
        return (
          <NewsTab
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filteredData={filteredData}
            getCategoryName={getCategoryName}
            getAccountName={getAccountName}
            getNewsTags={getNewsTags}
            onCreate={handleCreateNews}
            onEdit={handleEditNews}
            onDelete={handleDeleteNews}
          />
        );
      case "tags":
        if (!isStaff) {
          return (
            <div className="management-tab">
              <h2>Không có quyền truy cập</h2>
              <p>Chỉ Staff mới có thể quản lý tags.</p>
            </div>
          );
        }
        return (
          <TagsTab
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filteredData={filteredData}
            onCreate={handleCreateTag}
            onEdit={handleEditTag}
            onDelete={handleDeleteTag}
          />
        );
      case "profile":
        if (!isStaff) {
          return (
            <div className="management-tab">
              <h2>Không có quyền truy cập</h2>
              <p>Chỉ Staff mới có thể quản lý profile.</p>
            </div>
          );
        }
        return (
          <ProfileTab
            user={user}
            data={data}
            onOpenEditProfile={handleOpenEditProfile}
          />
        );
      case "history":
        if (!isStaff) {
          return (
            <div className="management-tab">
              <h2>Không có quyền truy cập</h2>
              <p>Chỉ Staff mới có thể xem lịch sử tin tức.</p>
            </div>
          );
        }
        return (
          <HistoryTab
            staffNews={staffNews}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterData={filterData}
            getCategoryName={getCategoryName}
            getNewsTags={getNewsTags}
            onEdit={handleEditNews}
            onDelete={handleDeleteNews}
          />
        );
      default:
        return null;
    }
  };

  // --- Modal (form add/edit) ---
  const renderModal = () => {
    if (!modalOpen) return null;
    let title = "";
    let formComponent = null;
    let onSave = null;

    if (activeTab === "users") {
      title = modalMode === "create" ? "Thêm tài khoản mới" : "Sửa tài khoản";
      formComponent = (
        <AccountForm
          formData={formData}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          errors={formErrors}
        />
      );
      onSave = handleSaveAccount;
    } else if (activeTab === "category") {
      title = modalMode === "create" ? "Thêm danh mục mới" : "Sửa danh mục";
      formComponent = (
        <CategoryForm
          formData={formData}
          onChange={(e) => {
            const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
            setFormData({ ...formData, [e.target.name]: value });
          }}
          errors={formErrors}
          categories={data.categories}
        />
      );
      onSave = handleSaveCategory;
    } else if (activeTab === "news") {
      title = modalMode === "create" ? "Thêm tin tức mới" : "Sửa tin tức";
      formComponent = (
        <NewsForm
          formData={formData}
          onChange={(e) => {
            const name = e.target.name;
            const value = name === "tagIDs" ? e.target.value : (e.target.type === "checkbox" ? e.target.checked : e.target.value);
            setFormData({ ...formData, [name]: value });
          }}
          errors={formErrors}
          categories={data.categories.filter((c) => c.isActive === 1 || c.isActive === true)}
          tags={data.tags}
          accounts={isStaff ? data.systemAccounts.filter((acc) => acc.accountID === user?.id) : data.systemAccounts}
          isStaff={isStaff}
          currentUserId={user?.id}
          isCreateMode={modalMode === "create"}
        />
      );
      onSave = handleSaveNews;
    } else if (activeTab === "tags") {
      title = modalMode === "create" ? "Thêm tag mới" : "Sửa tag";
      formComponent = (
        <TagForm
          formData={formData}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          errors={formErrors}
        />
      );
      onSave = handleSaveTag;
    } else if (activeTab === "profile") {
      title = "Chỉnh sửa Profile";
      formComponent = (
        <ProfileForm
          formData={formData}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          errors={formErrors}
        />
      );
      onSave = handleSaveProfile;
    }

    return (
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={title}
        size={activeTab === "news" ? "large" : "medium"}
      >
        {formComponent}
        <div className="modal-actions">
          <button className="btn-secondary" onClick={closeModal}>
            Hủy
          </button>
          <button className="btn-primary" onClick={onSave}>
            {modalMode === "create" ? "Tạo mới" : "Cập nhật"}
          </button>
        </div>
      </Modal>
    );
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) {
      setConfirmOpen(false);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (itemToDelete.type === "news") {
        await newsAPI.delete(itemToDelete.id, token);
        toast.success("Xóa tin tức thành công!");
      } else if (itemToDelete.type === "account") {
        await accountAPI.delete(itemToDelete.id, token);
        toast.success("Xóa tài khoản thành công!");
      } else if (itemToDelete.type === "category") {
        await categoryAPI.delete(itemToDelete.id, token);
        toast.success("Xóa danh mục thành công!");
      } else if (itemToDelete.type === "tag") {
        await tagAPI.delete(itemToDelete.id, token);
        toast.success("Xóa tag thành công!");
      }
      setItemToDelete(null);
      setConfirmOpen(false);
      await loadData();
    } catch (error) {
      toast.error("Lỗi xóa: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <Header />
        <div className="admin-container">
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <p>Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <Header />
      <div className="admin-container">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="admin-content">{renderContent()}</main>
      </div>
      {renderModal()}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác."
        type="danger"
      />
    </div>
  );
}

export default AdminPage;
