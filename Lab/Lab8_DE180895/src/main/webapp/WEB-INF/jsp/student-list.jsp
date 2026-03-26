<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Portal — Students</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
            --ink: #0f0e17;
            --cream: #fffcf5;
            --amber: #e8a020;
            --amber-light: #fdf3dc;
            --muted: #7a7580;
            --border: #e2ddd6;
            --surface: #ffffff;
            --success: #2ecc71;
            --danger: #e74c3c;
            --warn: #f39c12;
            --sidebar: #13121e;
        }

        body {
            font-family: 'DM Sans', sans-serif;
            background: var(--cream);
            min-height: 100vh;
            display: flex;
        }

        /* ── Sidebar ── */
        .sidebar {
            width: 240px;
            background: var(--sidebar);
            min-height: 100vh;
            padding: 32px 0;
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0; left: 0;
            z-index: 100;
        }

        .sidebar-brand {
            padding: 0 24px 32px;
            border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .sidebar-brand .logo {
            width: 40px; height: 40px;
            background: var(--amber);
            border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            font-size: 18px;
            margin-bottom: 12px;
        }

        .sidebar-brand h2 {
            font-family: 'Playfair Display', serif;
            color: var(--cream);
            font-size: 1.15rem;
        }

        .sidebar-brand p {
            color: rgba(255,252,245,0.35);
            font-size: 0.75rem;
            margin-top: 2px;
        }

        .sidebar-nav {
            flex: 1;
            padding: 20px 12px;
        }

        .nav-label {
            font-size: 0.68rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: rgba(255,252,245,0.25);
            padding: 0 12px;
            margin-bottom: 8px;
            margin-top: 16px;
        }

        .nav-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 12px;
            border-radius: 8px;
            text-decoration: none;
            color: rgba(255,252,245,0.55);
            font-size: 0.88rem;
            transition: all 0.18s;
            margin-bottom: 2px;
        }

        .nav-item:hover, .nav-item.active {
            background: rgba(232,160,32,0.12);
            color: var(--amber);
        }

        .nav-item .icon { font-size: 16px; }

        .sidebar-footer {
            padding: 20px 24px;
            border-top: 1px solid rgba(255,255,255,0.07);
        }

        .user-chip {
            display: flex; align-items: center; gap: 10px;
        }

        .user-avatar {
            width: 34px; height: 34px;
            background: var(--amber);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: 14px;
            font-weight: 600;
            color: var(--ink);
            flex-shrink: 0;
        }

        .user-info { flex: 1; overflow: hidden; }

        .user-name {
            font-size: 0.85rem;
            color: var(--cream);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .user-role {
            font-size: 0.72rem;
            color: rgba(255,252,245,0.35);
        }

        .logout-btn {
            color: rgba(255,252,245,0.35);
            text-decoration: none;
            font-size: 18px;
            transition: color 0.18s;
            padding: 4px;
        }
        .logout-btn:hover { color: var(--danger); }

        /* ── Main content ── */
        .main {
            margin-left: 240px;
            flex: 1;
            padding: 40px 48px;
            min-height: 100vh;
        }

        /* Top bar */
        .topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 40px;
        }

        .topbar-title h1 {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            color: var(--ink);
        }

        .topbar-title p {
            color: var(--muted);
            font-size: 0.88rem;
            margin-top: 4px;
        }

        .btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 22px;
            background: var(--ink);
            color: var(--cream);
            text-decoration: none;
            border-radius: 10px;
            font-size: 0.88rem;
            font-weight: 500;
            transition: all 0.2s;
            border: none;
            cursor: pointer;
        }

        .btn-primary:hover {
            background: #1e1c2e;
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(15,14,23,0.2);
        }

        /* Search & filter bar */
        .controls {
            display: flex;
            gap: 12px;
            margin-bottom: 24px;
        }

        .search-wrap {
            position: relative;
            flex: 1;
            max-width: 360px;
        }

        .search-icon {
            position: absolute;
            left: 14px; top: 50%;
            transform: translateY(-50%);
            color: var(--muted);
            font-size: 15px;
        }

        .search-input {
            width: 100%;
            padding: 11px 14px 11px 40px;
            border: 1.5px solid var(--border);
            border-radius: 9px;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.9rem;
            background: var(--surface);
            color: var(--ink);
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        .search-input:focus {
            border-color: var(--amber);
            box-shadow: 0 0 0 3px rgba(232,160,32,0.1);
        }

        /* Stats row */
        .stats-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 32px;
        }

        .stat-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 20px 22px;
        }

        .stat-card-top {
            display: flex; align-items: center; justify-content: space-between;
            margin-bottom: 10px;
        }

        .stat-card-label {
            font-size: 0.78rem;
            text-transform: uppercase;
            letter-spacing: 0.07em;
            color: var(--muted);
        }

        .stat-card-icon {
            width: 32px; height: 32px;
            border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            font-size: 15px;
        }

        .stat-card-value {
            font-family: 'Playfair Display', serif;
            font-size: 1.9rem;
            color: var(--ink);
        }

        /* Table */
        .table-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 16px;
            overflow: hidden;
        }

        .table-header {
            padding: 20px 24px;
            border-bottom: 1px solid var(--border);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .table-title {
            font-weight: 500;
            font-size: 0.95rem;
            color: var(--ink);
        }

        .table-count {
            font-size: 0.8rem;
            color: var(--muted);
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        thead th {
            padding: 13px 20px;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--muted);
            text-align: left;
            background: #faf9f6;
            border-bottom: 1px solid var(--border);
            font-weight: 500;
        }

        tbody tr {
            border-bottom: 1px solid var(--border);
            transition: background 0.15s;
        }

        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: #faf9f6; }

        td {
            padding: 16px 20px;
            font-size: 0.9rem;
            color: var(--ink);
            vertical-align: middle;
        }

        .student-cell {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .student-avatar {
            width: 36px; height: 36px;
            border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            font-size: 13px;
            font-weight: 600;
            color: var(--ink);
            flex-shrink: 0;
        }

        .student-fullname {
            font-weight: 500;
            color: var(--ink);
            line-height: 1.3;
        }

        .student-email {
            font-size: 0.78rem;
            color: var(--muted);
        }

        .mark-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 38px; height: 38px;
            border-radius: 50%;
            font-weight: 600;
            font-size: 0.85rem;
        }

        .mark-a  { background: #d5f5e3; color: #1e8449; }
        .mark-b  { background: #d6eaf8; color: #1a5276; }
        .mark-c  { background: #fdebd0; color: #935116; }
        .mark-d  { background: #fde8e8; color: #922b21; }

        .books-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 10px;
            background: var(--amber-light);
            border-radius: 20px;
            font-size: 0.8rem;
            color: #8a5c00;
        }

        .actions {
            display: flex;
            gap: 6px;
        }

        .btn-icon {
            width: 32px; height: 32px;
            border-radius: 7px;
            display: flex; align-items: center; justify-content: center;
            text-decoration: none;
            font-size: 14px;
            border: 1.5px solid var(--border);
            background: var(--surface);
            color: var(--muted);
            cursor: pointer;
            transition: all 0.18s;
        }

        .btn-icon:hover { border-color: var(--amber); color: var(--amber); background: var(--amber-light); }
        .btn-icon.danger:hover { border-color: var(--danger); color: var(--danger); background: #fde8e8; }

        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: var(--muted);
        }

        .empty-state .icon { font-size: 48px; margin-bottom: 12px; }
        .empty-state p { font-size: 0.9rem; }

        /* Alert */
        .alert {
            padding: 12px 18px;
            border-radius: 10px;
            font-size: 0.88rem;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .alert-success { background: #d5f5e3; color: #1e8449; border: 1px solid rgba(30,132,73,0.2); }
        .alert-danger  { background: #fde8e8; color: #922b21; border: 1px solid rgba(146,43,33,0.2); }

        @media (max-width: 900px) {
            .stats-row { grid-template-columns: repeat(2,1fr); }
            .main { padding: 24px 20px; }
        }
    </style>
</head>
<body>

<!-- Sidebar -->
<aside class="sidebar">
    <div class="sidebar-brand">
        <div class="logo">🎓</div>
        <h2>Student Portal</h2>
        <p>Management System</p>
    </div>

    <nav class="sidebar-nav">
        <div class="nav-label">Menu</div>
        <a href="${pageContext.request.contextPath}/students" class="nav-item active">
            <span class="icon">👥</span> Students
        </a>
        <a href="${pageContext.request.contextPath}/students/new" class="nav-item">
            <span class="icon">➕</span> Add Student
        </a>
    </nav>

    <div class="sidebar-footer">
        <div class="user-chip">
            <div class="user-avatar">A</div>
            <div class="user-info">
                <div class="user-name">Admin</div>
                <div class="user-role">Administrator</div>
            </div>
            <a href="${pageContext.request.contextPath}/logout" class="logout-btn" title="Logout">⏏</a>
        </div>
    </div>
</aside>

<!-- Main Content -->
<main class="main">
    <div class="topbar">
        <div class="topbar-title">
            <h1>Students</h1>
            <p>Manage and track all student records</p>
        </div>
        <a href="${pageContext.request.contextPath}/students/new" class="btn-primary">
            + Add Student
        </a>
    </div>

    <!-- Alerts -->
    <c:if test="${not empty successMessage}">
        <div class="alert alert-success">✓ ${successMessage}</div>
    </c:if>
    <c:if test="${not empty errorMessage}">
        <div class="alert alert-danger">⚠ ${errorMessage}</div>
    </c:if>

    <!-- Stats -->
    <div class="stats-row">
        <div class="stat-card">
            <div class="stat-card-top">
                <div class="stat-card-label">Total Students</div>
                <div class="stat-card-icon" style="background:#f0eeff;">👥</div>
            </div>
            <div class="stat-card-value">${students.size()}</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-top">
                <div class="stat-card-label">Avg Score</div>
                <div class="stat-card-icon" style="background:#fdf3dc;">📊</div>
            </div>
            <div class="stat-card-value">
                <c:set var="total" value="0"/>
                <c:forEach var="s" items="${students}">
                    <c:set var="total" value="${total + s.mark}"/>
                </c:forEach>
                <c:choose>
                    <c:when test="${students.size() > 0}"><fmt:formatNumber value="${total / students.size()}" maxFractionDigits="1"/></c:when>
                    <c:otherwise>—</c:otherwise>
                </c:choose>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-card-top">
                <div class="stat-card-label">Top Scorers</div>
                <div class="stat-card-icon" style="background:#d5f5e3;">🏆</div>
            </div>
            <div class="stat-card-value">
                <c:set var="topCount" value="0"/>
                <c:forEach var="s" items="${students}">
                    <c:if test="${s.mark >= 90}"><c:set var="topCount" value="${topCount + 1}"/></c:if>
                </c:forEach>
                ${topCount}
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-card-top">
                <div class="stat-card-label">Total Books</div>
                <div class="stat-card-icon" style="background:#fde8e8;">📚</div>
            </div>
            <div class="stat-card-value">
                <c:set var="bookTotal" value="0"/>
                <c:forEach var="s" items="${students}">
                    <c:if test="${not empty s.books}"><c:set var="bookTotal" value="${bookTotal + s.books.size()}"/></c:if>
                </c:forEach>
                ${bookTotal}
            </div>
        </div>
    </div>

    <!-- Search -->
    <div class="controls">
        <div class="search-wrap">
            <span class="search-icon">🔍</span>
            <input type="text" class="search-input" id="searchInput" placeholder="Search by name or email…" oninput="filterTable()">
        </div>
    </div>

    <!-- Table -->
    <div class="table-card">
        <div class="table-header">
            <span class="table-title">All Students</span>
            <span class="table-count">${students.size()} records</span>
        </div>

        <c:choose>
            <c:when test="${empty students}">
                <div class="empty-state">
                    <div class="icon">🎓</div>
                    <p>No students found. <a href="${pageContext.request.contextPath}/students/new" style="color:var(--amber)">Add the first one</a>.</p>
                </div>
            </c:when>
            <c:otherwise>
                <table id="studentTable">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>ID</th>
                            <th>Score</th>
                            <th>Grade</th>
                            <th>Books</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <c:forEach var="student" items="${students}" varStatus="loop">
                            <tr>
                                <td>
                                    <div class="student-cell">
                                        <div class="student-avatar" style="background: hsl(${loop.index * 47 + 30}, 70%, 88%)">
                                            ${student.firstName.substring(0,1)}${student.lastName.substring(0,1)}
                                        </div>
                                        <div>
                                            <div class="student-fullname">${student.firstName} ${student.lastName}</div>
                                            <div class="student-email">${student.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style="color:var(--muted);font-size:0.82rem;">#${student.id}</td>
                                <td>
                                    <c:choose>
                                        <c:when test="${student.mark >= 90}"><span class="mark-badge mark-a">${student.mark}</span></c:when>
                                        <c:when test="${student.mark >= 75}"><span class="mark-badge mark-b">${student.mark}</span></c:when>
                                        <c:when test="${student.mark >= 55}"><span class="mark-badge mark-c">${student.mark}</span></c:when>
                                        <c:otherwise><span class="mark-badge mark-d">${student.mark}</span></c:otherwise>
                                    </c:choose>
                                </td>
                                <td>
                                    <c:choose>
                                        <c:when test="${student.mark >= 90}">A</c:when>
                                        <c:when test="${student.mark >= 75}">B</c:when>
                                        <c:when test="${student.mark >= 55}">C</c:when>
                                        <c:otherwise>D</c:otherwise>
                                    </c:choose>
                                </td>
                                <td>
                                    <c:choose>
                                        <c:when test="${not empty student.books}">
                                            <span class="books-badge">📚 ${student.books.size()}</span>
                                        </c:when>
                                        <c:otherwise><span style="color:var(--muted);font-size:0.82rem;">—</span></c:otherwise>
                                    </c:choose>
                                </td>
                                <td>
                                    <div class="actions">
                                        <a href="${pageContext.request.contextPath}/students/${student.id}" class="btn-icon" title="View">👁</a>
                                        <a href="${pageContext.request.contextPath}/students/${student.id}/edit" class="btn-icon" title="Edit">✏</a>
                                        <form action="${pageContext.request.contextPath}/students/${student.id}/delete" method="post" style="display:inline"
                                              onsubmit="return confirm('Delete ${student.firstName} ${student.lastName}?')">
                                            <button type="submit" class="btn-icon danger" title="Delete">🗑</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
            </c:otherwise>
        </c:choose>
    </div>
</main>

<script>
function filterTable() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('#studentTable tbody tr').forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
    });
}
</script>
</body>
</html>
