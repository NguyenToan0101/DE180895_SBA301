function TagsTab({
  searchTerm,
  onSearchChange,
  filteredData,
  onCreate,
  onEdit,
  onDelete,
}) {
  return (
    <div className="management-tab tags-tab">
      <div className="tab-header">
        <h2>Quản lý Tags</h2>
        <button className="btn-primary" onClick={onCreate}>
          + Thêm mới
        </button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc ghi chú..."
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
              <th>Tên Tag</th>
              <th>Ghi chú</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((tag) => (
              <tr key={tag.tagID}>
                <td>{tag.tagID}</td>
                <td>{tag.tagName}</td>
                <td>{tag.note || "-"}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => onEdit(tag)}
                      title="Sửa"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => onDelete(tag.tagID)}
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

export default TagsTab;
