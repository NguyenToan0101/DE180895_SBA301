function HistoryTab({
  staffNews,
  searchTerm,
  onSearchChange,
  filterData,
  getCategoryName,
  getNewsTags,
  onEdit,
  onDelete,
}) {
  const filteredStaffNews = searchTerm
    ? filterData(staffNews, ["newsTitle", "headline", "newsContent"])
    : staffNews;

  return (
    <div className="management-tab history-tab">
      <div className="tab-header">
        <h2>Lịch sử Tin tức của tôi</h2>
        <p className="history-subtitle">Tổng cộng {staffNews.length} bài viết</p>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm theo tiêu đề, headline hoặc nội dung..."
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
              <th>Tiêu đề</th>
              <th>Headline</th>
              <th>Danh mục</th>
              <th>Ngày tạo</th>
              <th>Trạng thái</th>
              <th>Tags</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaffNews.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  Chưa có tin tức nào được tạo bởi bạn.
                </td>
              </tr>
            ) : (
              filteredStaffNews.map((article) => (
                <tr key={article.newsArticleID}>
                  <td>{article.newsArticleID}</td>
                  <td className="title-cell">{article.newsTitle}</td>
                  <td className="headline-cell">{article.headline}</td>
                  <td>{getCategoryName(article.categoryID)}</td>
                  <td>
                    {new Date(article.createdDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td>
                    <span
                      className={
                        article.newsStatus === 1
                          ? "status-active"
                          : "status-inactive"
                      }
                    >
                      {article.newsStatus === 1 ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{getNewsTags(article) || "None"}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => onEdit(article)}
                        title="Sửa"
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        className="btn-delete"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onDelete(article.newsArticleID);
                        }}
                        title="Xóa"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryTab;
