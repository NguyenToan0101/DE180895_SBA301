function CategoryTab({
  searchTerm,
  onSearchChange,
  filteredData,
  getCategoryName,
  onCreate,
  onEdit,
  onDelete,
}) {
  return (
    <div className="management-tab categories-tab">
      <div className="tab-header">
        <h2>Quản lý Danh mục</h2>
        <button className="btn-primary" onClick={onCreate}>
          + Thêm mới
        </button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc mô tả..."
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
              <th>Tên danh mục</th>
              <th>Mô tả</th>
              <th>Danh mục cha</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((category) => (
              <tr key={category.categoryID}>
                <td>{category.categoryID}</td>
                <td>{category.categoryName}</td>
                <td>{category.categoryDescription}</td>
                <td>
                  {category.parentCategoryID
                    ? getCategoryName(category.parentCategoryID)
                    : "None"}
                </td>
                <td>
                  <span
                    className={
                      category.isActive ? "status-active" : "status-inactive"
                    }
                  >
                    {category.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => onEdit(category)}
                      title="Sửa"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => onDelete(category.categoryID)}
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

export default CategoryTab;
