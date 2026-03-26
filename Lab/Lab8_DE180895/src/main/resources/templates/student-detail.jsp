<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Portal — ${student.firstName} ${student.lastName}</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
            --ink: #0f0e17; --cream: #fffcf5; --amber: #e8a020; --amber-light: #fdf3dc;
            --muted: #7a7580; --border: #e2ddd6; --surface: #ffffff; --danger: #e74c3c; --sidebar: #13121e;
        }
        body { font-family: 'DM Sans', sans-serif; background: var(--cream); min-height: 100vh; display: flex; }

        /* Sidebar */
        .sidebar { width: 240px; background: var(--sidebar); min-height: 100vh; padding: 32px 0; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; z-index: 100; }
        .sidebar-brand { padding: 0 24px 32px; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .sidebar-brand .logo { width: 40px; height: 40px; background: var(--amber); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 12px; }
        .sidebar-brand h2 { font-family: 'Playfair Display', serif; color: var(--cream); font-size: 1.15rem; }
        .sidebar-brand p { color: rgba(255,252,245,0.35); font-size: 0.75rem; margin-top: 2px; }
        .sidebar-nav { flex: 1; padding: 20px 12px; }
        .nav-label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,252,245,0.25); padding: 0 12px; margin-bottom: 8px; }
        .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; text-decoration: none; color: rgba(255,252,245,0.55); font-size: 0.88rem; transition: all 0.18s; margin-bottom: 2px; }
        .nav-item:hover, .nav-item.active { background: rgba(232,160,32,0.12); color: var(--amber); }
        .sidebar-footer { padding: 20px 24px; border-top: 1px solid rgba(255,255,255,0.07); }
        .user-chip { display: flex; align-items: center; gap: 10px; }
        .user-avatar { width: 34px; height: 34px; background: var(--amber); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: var(--ink); flex-shrink: 0; }
        .user-info { flex: 1; overflow: hidden; }
        .user-name { font-size: 0.85rem; color: var(--cream); }
        .user-role { font-size: 0.72rem; color: rgba(255,252,245,0.35); }
        .logout-btn { color: rgba(255,252,245,0.35); text-decoration: none; font-size: 18px; transition: color 0.18s; }
        .logout-btn:hover { color: var(--danger); }

        .main { margin-left: 240px; flex: 1; padding: 40px 48px; }

        .topbar { display: flex; align-items: center; gap: 16px; margin-bottom: 40px; }
        .back-btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border: 1.5px solid var(--border); border-radius: 9px; text-decoration: none; color: var(--muted); font-size: 0.85rem; transition: all 0.18s; background: var(--surface); }
        .back-btn:hover { border-color: var(--ink); color: var(--ink); }
        .topbar-actions { margin-left: auto; display: flex; gap: 10px; }

        .btn-edit { display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; background: var(--ink); color: var(--cream); text-decoration: none; border-radius: 9px; font-size: 0.88rem; transition: all 0.2s; }
        .btn-edit:hover { background: #1e1c2e; transform: translateY(-1px); }
        .btn-delete { display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; background: #fde8e8; color: var(--danger); border: 1.5px solid rgba(231,76,60,0.2); border-radius: 9px; font-size: 0.88rem; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
        .btn-delete:hover { background: var(--danger); color: white; }

        /* Profile hero */
        .profile-hero {
            background: var(--ink);
            border-radius: 18px;
            padding: 40px;
            display: flex; align-items: center; gap: 32px;
            margin-bottom: 28px;
            position: relative;
            overflow: hidden;
        }
        .profile-hero::before {
            content: '';
            position: absolute; top: -80px; right: -80px;
            width: 280px; height: 280px;
            border: 50px solid rgba(232,160,32,0.08);
            border-radius: 50%;
        }
        .profile-avatar {
            width: 90px; height: 90px;
            background: var(--amber);
            border-radius: 22px;
            display: flex; align-items: center; justify-content: center;
            font-family: 'Playfair Display', serif;
            font-size: 2rem; font-weight: 700;
            color: var(--ink);
            flex-shrink: 0;
            position: relative; z-index: 1;
        }
        .profile-info { position: relative; z-index: 1; }
        .profile-name { font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--cream); margin-bottom: 6px; }
        .profile-meta { display: flex; gap: 16px; flex-wrap: wrap; }
        .meta-item { display: flex; align-items: center; gap: 6px; color: rgba(255,252,245,0.5); font-size: 0.85rem; }
        .profile-score { margin-left: auto; text-align: center; position: relative; z-index: 1; }
        .score-circle {
            width: 90px; height: 90px;
            border-radius: 50%;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            border: 4px solid var(--amber);
        }
        .score-num { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--amber); line-height: 1; }
        .score-label { font-size: 0.68rem; color: rgba(255,252,245,0.4); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 2px; }
        .grade-badge {
            margin-top: 8px; font-size: 0.8rem; font-weight: 600;
            padding: 3px 12px; border-radius: 20px; display: inline-block;
        }
        .grade-a { background: #d5f5e3; color: #1e8449; }
        .grade-b { background: #d6eaf8; color: #1a5276; }
        .grade-c { background: #fdebd0; color: #935116; }
        .grade-d { background: #fde8e8; color: #922b21; }

        /* Info cards */
        .cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .info-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
        .info-card-header { padding: 18px 22px; border-bottom: 1px solid var(--border); background: #faf9f6; display: flex; align-items: center; gap: 10px; }
        .info-card-header .hicon { font-size: 18px; }
        .info-card-header h4 { font-size: 0.88rem; font-weight: 500; color: var(--ink); }
        .info-card-body { padding: 22px; }
        .info-row { display: flex; flex-direction: column; gap: 4px; margin-bottom: 18px; }
        .info-row:last-child { margin-bottom: 0; }
        .info-row-label { font-size: 0.73rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); }
        .info-row-value { font-size: 0.92rem; color: var(--ink); font-weight: 500; }

        /* Books */
        .books-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; margin-top: 20px; }
        .book-item { display: flex; align-items: center; gap: 14px; padding: 14px 22px; border-bottom: 1px solid var(--border); }
        .book-item:last-child { border-bottom: none; }
        .book-icon { width: 36px; height: 36px; background: var(--amber-light); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
        .book-title { font-size: 0.9rem; font-weight: 500; color: var(--ink); }
        .book-author { font-size: 0.78rem; color: var(--muted); }

        .empty-books { padding: 32px; text-align: center; color: var(--muted); font-size: 0.88rem; }
    </style>
</head>
<body>

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
            <a href="${pageContext.request.contextPath}/logout" class="logout-btn">⏏</a>
        </div>
    </div>
</aside>

<main class="main">
    <div class="topbar">
        <a href="${pageContext.request.contextPath}/students" class="back-btn">← All Students</a>
        <div class="topbar-actions">
            <a href="${pageContext.request.contextPath}/students/${student.id}/edit" class="btn-edit">✏ Edit</a>
            <form action="${pageContext.request.contextPath}/students/${student.id}/delete" method="post" style="display:inline"
                  onsubmit="return confirm('Delete this student?')">
                <button type="submit" class="btn-delete">🗑 Delete</button>
            </form>
        </div>
    </div>

    <!-- Profile Hero -->
    <div class="profile-hero">
        <div class="profile-avatar">
            ${student.firstName.substring(0,1)}${student.lastName.substring(0,1)}
        </div>
        <div class="profile-info">
            <div class="profile-name">${student.firstName} ${student.lastName}</div>
            <div class="profile-meta">
                <span class="meta-item">✉ ${student.email}</span>
                <span class="meta-item">🆔 ID: ${student.id}</span>
            </div>
        </div>
        <div class="profile-score">
            <div class="score-circle">
                <span class="score-num">${student.mark}</span>
                <span class="score-label">Score</span>
            </div>
            <c:choose>
                <c:when test="${student.mark >= 90}"><span class="grade-badge grade-a">Grade A</span></c:when>
                <c:when test="${student.mark >= 75}"><span class="grade-badge grade-b">Grade B</span></c:when>
                <c:when test="${student.mark >= 55}"><span class="grade-badge grade-c">Grade C</span></c:when>
                <c:otherwise><span class="grade-badge grade-d">Grade D</span></c:otherwise>
            </c:choose>
        </div>
    </div>

    <!-- Info Cards -->
    <div class="cards-grid">
        <div class="info-card">
            <div class="info-card-header">
                <span class="hicon">👤</span>
                <h4>Personal Information</h4>
            </div>
            <div class="info-card-body">
                <div class="info-row">
                    <div class="info-row-label">First Name</div>
                    <div class="info-row-value">${student.firstName}</div>
                </div>
                <div class="info-row">
                    <div class="info-row-label">Last Name</div>
                    <div class="info-row-value">${student.lastName}</div>
                </div>
                <div class="info-row">
                    <div class="info-row-label">Student ID</div>
                    <div class="info-row-value">#${student.id}</div>
                </div>
            </div>
        </div>

        <div class="info-card">
            <div class="info-card-header">
                <span class="hicon">📧</span>
                <h4>Account Details</h4>
            </div>
            <div class="info-card-body">
                <div class="info-row">
                    <div class="info-row-label">Email Address</div>
                    <div class="info-row-value">${student.email}</div>
                </div>
                <div class="info-row">
                    <div class="info-row-label">Academic Score</div>
                    <div class="info-row-value">${student.mark} / 100</div>
                </div>
                <div class="info-row">
                    <div class="info-row-label">Total Books</div>
                    <div class="info-row-value">
                        <c:choose>
                            <c:when test="${not empty student.books}">${student.books.size()} book(s)</c:when>
                            <c:otherwise>No books assigned</c:otherwise>
                        </c:choose>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Books -->
    <div class="books-card">
        <div class="info-card-header" style="padding:18px 22px;border-bottom:1px solid var(--border);background:#faf9f6;display:flex;align-items:center;gap:10px;">
            <span style="font-size:18px;">📚</span>
            <h4 style="font-size:0.88rem;font-weight:500;color:var(--ink);">Books (${empty student.books ? 0 : student.books.size()})</h4>
        </div>
        <c:choose>
            <c:when test="${not empty student.books}">
                <c:forEach var="book" items="${student.books}">
                    <div class="book-item">
                        <div class="book-icon">📖</div>
                        <div>
                            <div class="book-title">${book.title}</div>
                            <c:if test="${not empty book.author}">
                                <div class="book-author">by ${book.author}</div>
                            </c:if>
                        </div>
                    </div>
                </c:forEach>
            </c:when>
            <c:otherwise>
                <div class="empty-books">📭 No books assigned to this student</div>
            </c:otherwise>
        </c:choose>
    </div>
</main>

</body>
</html>
