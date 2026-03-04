import "../../styles/Form.css";

function TagForm({ formData, onChange, errors = {} }) {
  return (
    <div className="form-container">
      <section className="form-section">
        <h3 className="form-section-title"><span className="section-num">1</span>Thông tin tag</h3>
        <div className="form-group">
          <label htmlFor="tagName">Tên tag<span className="required">*</span></label>
          <input
            type="text"
            id="tagName"
            name="tagName"
            value={formData.tagName || ""}
            onChange={onChange}
            className={errors.tagName ? "error" : ""}
            placeholder="Nhập tên tag"
          />
          {errors.tagName && (
            <span className="error-message">{errors.tagName}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="note">Ghi chú</label>
          <textarea
            id="note"
            name="note"
            value={formData.note || ""}
            onChange={onChange}
            className={errors.note ? "error" : ""}
            placeholder="Nhập ghi chú cho tag (tùy chọn)"
            rows="4"
          />
          {errors.note && (
            <span className="error-message">{errors.note}</span>
          )}
        </div>
      </section>
    </div>
  );
}

export default TagForm;
