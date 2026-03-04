import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

/**
 * Dashboard: Welcome + Stats + Biểu đồ + Tin tức (bố cục: 2 card trên, 4 card grid dưới)
 */
function DashboardTab({
  user,
  isAdmin,
  data,
  setActiveTab,
  getCategoryName,
  getNewsTags,
  onEditNews,
}) {
  const newsList = data.newsArticles.slice(0, 6);
  const topTwo = newsList.slice(0, 2);
  const gridFour = newsList.slice(2, 6);

  const chartDataByCategory = useMemo(() => {
    const map = {};
    data.newsArticles.forEach((a) => {
      const name = getCategoryName(a.categoryID);
      map[name] = (map[name] || 0) + 1;
    });
    return Object.entries(map).map(([name, count]) => ({ name, count }));
  }, [data.newsArticles, getCategoryName]);

  const chartDataByStatus = useMemo(() => {
    const published = data.newsArticles.filter((a) => a.newsStatus === 1).length;
    const draft = data.newsArticles.length - published;
    return [
      { name: "Đã xuất bản", value: published, color: "#22c55e" },
      { name: "Bản nháp", value: draft, color: "#eab308" },
    ];
  }, [data.newsArticles]);

  const renderNewsCard = (article, compact = false) => (
    <div
      key={article.newsArticleID}
      className={`dashboard-news-item ${compact ? "compact" : ""}`}
    >
      <div className="news-item-header">
        <div className="news-header-left">
          <h4 className="news-title">{article.newsTitle}</h4>
          <div className="news-meta">
            <span className="news-category">
              {getCategoryName(article.categoryID)}
            </span>
            <span className="news-date">
              {new Date(article.createdDate).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span
              className={`news-status ${article.newsStatus === 1 ? "published" : "draft"}`}
            >
              {article.newsStatus === 1 ? "Đã xuất bản" : "Bản nháp"}
            </span>
          </div>
        </div>
        <div className="news-actions">
          <button
            type="button"
            className="btn-edit-small"
            onClick={() => {
              setActiveTab("news");
              setTimeout(() => onEditNews(article), 100);
            }}
            title="Chỉnh sửa"
          >
            ✏️ {compact ? "" : "Chỉnh sửa"}
          </button>
        </div>
      </div>
      <p className="news-headline">{article.headline}</p>
      <div className="news-content">{article.newsContent}</div>
      {getNewsTags(article) && (
        <div className="news-tags">
          {getNewsTags(article).split(", ").map((tag, index) => (
            <span key={index} className="news-tag">
              🏷️ {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="dashboard-tab">
      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <h2>Xin chào, {user?.accountName || "Admin"} 👋</h2>
          <p className="dashboard-subtitle">
            Tổng quan hệ thống và tin tức mới nhất
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <button
          type="button"
          className={`stat-card stat-accounts clickable ${!isAdmin ? "disabled" : ""}`}
          onClick={() => isAdmin && setActiveTab("users")}
          disabled={!isAdmin}
        >
          <div className="stat-icon">👤</div>
          <div className="stat-info">
            <h3>Tài khoản</h3>
            <p className="stat-number">{data.systemAccounts.length}</p>
          </div>
        </button>
        <button
          type="button"
          className="stat-card stat-categories clickable"
          onClick={() => setActiveTab("category")}
        >
          <div className="stat-icon">📁</div>
          <div className="stat-info">
            <h3>Danh mục</h3>
            <p className="stat-number">{data.categories.length}</p>
          </div>
        </button>
        <button
          type="button"
          className="stat-card stat-news clickable"
          onClick={() => setActiveTab("news")}
        >
          <div className="stat-icon">📰</div>
          <div className="stat-info">
            <h3>Tin tức</h3>
            <p className="stat-number">{data.newsArticles.length}</p>
          </div>
        </button>
        <button
          type="button"
          className="stat-card stat-tags clickable"
          onClick={() => setActiveTab("tags")}
        >
          <div className="stat-icon">🏷️</div>
          <div className="stat-info">
            <h3>Tags</h3>
            <p className="stat-number">{data.tags.length}</p>
          </div>
        </button>
      </div>

      {/* Biểu đồ */}
      <section className="dashboard-charts">
        <div className="dashboard-chart-card">
          <h4>Tin tức theo danh mục</h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={chartDataByCategory}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(30,41,59,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Bar dataKey="count" fill="#06b6d4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="dashboard-chart-card">
          <h4>Tin tức theo trạng thái</h4>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={chartDataByStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={{ stroke: "rgba(255,255,255,0.3)" }}
              >
                {chartDataByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "rgba(30,41,59,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "12px" }}
                formatter={(value) => <span style={{ color: "#e2e8f0" }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="dashboard-news-section">
        <div className="dashboard-news-section-header">
          <h3>Tin tức mới nhất</h3>
          <button
            type="button"
            className="btn-primary btn-sm"
            onClick={() => setActiveTab("news")}
          >
            Xem tất cả
          </button>
        </div>

        {data.newsArticles.length === 0 ? (
          <div className="empty-state">
            <p>Chưa có tin tức nào. Hãy thêm tin tức mới trong mục Tin tức!</p>
          </div>
        ) : (
          <div className="dashboard-news-layout">
            <div className="dashboard-news-top-row">
              {topTwo.map((article) => renderNewsCard(article, false))}
            </div>
            {gridFour.length > 0 && (
              <div className="dashboard-news-grid">
                {gridFour.map((article) => renderNewsCard(article, true))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardTab;
