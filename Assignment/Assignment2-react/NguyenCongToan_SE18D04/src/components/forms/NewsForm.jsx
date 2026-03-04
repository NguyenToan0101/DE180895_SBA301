import { useState, useEffect, useRef } from "react";
import "../../styles/Form.css";

function NewsForm({
  formData,
  onChange,
  errors = {},
  categories = [],
  tags = [],
  accounts = [],
  isStaff = false,
  currentUserId = null,
  isCreateMode = false,
}) {
  const selectedTagIds = formData.tagIDs || [];
  const [tagsDropdownOpen, setTagsDropdownOpen] = useState(false);
  const tagsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (tagsRef.current && !tagsRef.current.contains(e.target)) {
        setTagsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTagToggle = (tagID) => {
    const newTagIDs = selectedTagIds.includes(tagID)
      ? selectedTagIds.filter((id) => id !== tagID)
      : [...selectedTagIds, tagID];
    onChange({
      target: { name: "tagIDs", value: newTagIDs, type: "checkbox" },
    });
  };

  const selectedTags = tags.filter((t) => selectedTagIds.includes(t.tagID));

  return (
    <div className="form-container">
      <section className="form-section">
        <h3 className="form-section-title"><span className="section-num">1</span>Nội dung bài viết</h3>
        <div className="form-group">
          <label htmlFor="newsTitle">Tiêu đề<span className="required">*</span></label>
          <input
            type="text"
            id="newsTitle"
            name="newsTitle"
            value={formData.newsTitle || ""}
            onChange={onChange}
            className={errors.newsTitle ? "error" : ""}
            placeholder="Nhập tiêu đề bài viết"
          />
          {errors.newsTitle && (
            <span className="error-message">{errors.newsTitle}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="headline">Headline<span className="required">*</span></label>
          <input
            type="text"
            id="headline"
            name="headline"
            value={formData.headline || ""}
            onChange={onChange}
            className={errors.headline ? "error" : ""}
            placeholder="Tóm tắt ngắn gọn (hiển thị trong danh sách)"
          />
          {errors.headline && (
            <span className="error-message">{errors.headline}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="newsContent">Nội dung<span className="required">*</span></label>
          <textarea
            id="newsContent"
            name="newsContent"
            value={formData.newsContent || ""}
            onChange={onChange}
            className={errors.newsContent ? "error" : ""}
            placeholder="Nhập nội dung bài viết"
            rows="6"
          />
          {errors.newsContent && (
            <span className="error-message">{errors.newsContent}</span>
          )}
        </div>
      </section>

      <section className="form-section">
        <h3 className="form-section-title"><span className="section-num">2</span>Phân loại & xuất bản</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="categoryID">Danh mục<span className="required">*</span></label>
            <select
              id="categoryID"
              name="categoryID"
              value={formData.categoryID || ""}
              onChange={onChange}
              className={errors.categoryID ? "error" : ""}
            >
              <option value="">Chọn danh mục</option>
              {categories && categories.length > 0 ? (
                categories
                  .filter((cat) => cat.isActive === 1 || cat.isActive === true)
                  .map((cat) => (
                    <option key={cat.categoryID} value={String(cat.categoryID)}>
                      {cat.categoryName}
                    </option>
                  ))
              ) : (
                <option value="" disabled>Đang tải danh mục...</option>
              )}
            </select>
            {errors.categoryID && (
              <span className="error-message">{errors.categoryID}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="newsSource">Nguồn</label>
            <input
              type="text"
              id="newsSource"
              name="newsSource"
              value={formData.newsSource || ""}
              onChange={onChange}
              placeholder="VD: FUNews"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="createdByID">Người tạo<span className="required">*</span></label>
            <select
              id="createdByID"
              name="createdByID"
              value={formData.createdByID || (isStaff && isCreateMode ? currentUserId : "")}
              onChange={onChange}
              className={errors.createdByID ? "error" : ""}
              disabled={isStaff && isCreateMode}
            >
              <option value="">Chọn người tạo</option>
              {accounts.map((acc) => (
                <option key={acc.accountID} value={acc.accountID}>
                  {acc.accountName}
                </option>
              ))}
            </select>
            {isStaff && isCreateMode && (
              <span className="info-message">Bạn sẽ là người tạo bài viết này</span>
            )}
            {errors.createdByID && (
              <span className="error-message">{errors.createdByID}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="newsStatus">Trạng thái<span className="required">*</span></label>
            <select
              id="newsStatus"
              name="newsStatus"
              value={formData.newsStatus !== undefined ? formData.newsStatus : ""}
              onChange={onChange}
              className={errors.newsStatus ? "error" : ""}
            >
              <option value="">Chọn trạng thái</option>
              <option value="1">Published</option>
              <option value="0">Draft</option>
            </select>
            {errors.newsStatus && (
              <span className="error-message">{errors.newsStatus}</span>
            )}
          </div>
        </div>
      </section>

      <section className="form-section">
        <h3 className="form-section-title"><span className="section-num">3</span>Tags</h3>
        <div className="form-group" ref={tagsRef}>
          <label>Chọn tags (tùy chọn)</label>
          <div
            className={`tags-select-bar ${tagsDropdownOpen ? "open" : ""}`}
            onClick={() => setTagsDropdownOpen(!tagsDropdownOpen)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setTagsDropdownOpen(!tagsDropdownOpen);
              }
            }}
          >
            <div className="tags-select-value">
              {selectedTags.length === 0 ? (
                <span className="tags-select-placeholder">Chọn tags...</span>
              ) : (
                <span className="tags-select-chips">
                  {selectedTags.map((t) => (
                    <span key={t.tagID} className="tags-select-chip">
                      {t.tagName}
                    </span>
                  ))}
                </span>
              )}
            </div>
            <span className="tags-select-arrow" aria-hidden>▼</span>
          </div>
          <div className={`tags-select-dropdown ${tagsDropdownOpen ? "open" : ""}`}>
            {tags.length === 0 ? (
              <div className="tags-select-empty">Chưa có tag nào</div>
            ) : (
              <ul className="tags-select-list">
                {tags.map((tag) => (
                  <li
                    key={tag.tagID}
                    className={`tags-select-option ${selectedTagIds.includes(tag.tagID) ? "selected" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTagToggle(tag.tagID);
                    }}
                  >
                    <span className="tags-select-option-check">{selectedTagIds.includes(tag.tagID) ? "✓" : ""}</span>
                    <span>{tag.tagName}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default NewsForm;
