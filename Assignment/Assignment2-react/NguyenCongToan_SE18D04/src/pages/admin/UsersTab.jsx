function UsersTab({
  searchTerm,
  onSearchChange,
  filteredData,
  onCreate,
  onEdit,
  onDelete,
}) {
  return (
    <div className="management-tab users-tab">
      <div className="tab-header">
        <h2>Quản lý Tài khoản</h2>
        <button className="btn-primary" onClick={onCreate}>
          + Thêm mới
        </button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên tài khoản</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((account) => (
              <tr key={account.accountID}>
                <td>{account.accountID}</td>
                <td>{account.accountName}</td>
                <td>{account.accountEmail}</td>
                <td>
                  <span
                    className={`role-badge role-${account.accountRole === 1 ? "admin" : "staff"}`}
                  >
                    {account.accountRole === 1 ? "Admin" : "Staff"}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => onEdit(account)}
                      title="Sửa"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => onDelete(account.accountID)}
                      title="Xóa"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTab;
