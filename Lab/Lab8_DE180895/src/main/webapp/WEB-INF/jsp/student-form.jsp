<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Portal — ${empty student.id ? 'Add' : 'Edit'} Student</title>
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
            --danger: #e74c3c;
            --sidebar: #13121e;
        }

        body {
            font-family: 'DM Sans', sans-serif;
            background: var(--cream);
            min-height: 100vh;
            display: flex;
        }

        /* Sidebar (same as list page) */
        .sidebar {
            width: 240px; background: var(--sidebar);
            min-height: 100vh; padding: 32px 0;
            display: flex; flex-direction: column;
            position: fixed; top: 0; left: 0; z-index: 100;
        }
        .sidebar-brand { padding: 0 24px 32px; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .sidebar-brand .logo { width: 40px; height: 40px; background: var(--amber); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 12px; }
        .sidebar-brand h2 { font-family: 'Playfair Display', serif; color: var(--cream); font-size: 1.15rem; }
        .sidebar-brand p { color: rgba(255,252,245,0.35); font-size: 0.75rem; margin-top: 2px; }
        .sidebar-nav { flex: 1; padding: 20px 12px; }
        .nav-label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,252,245,0.25); padding: 0 12px; margin-bottom: 8px; margin-top: 16px; }
        .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; text-decoration: none; color: rgba(255,252,245,0.55); font-size: 0.88rem; transition: all 0.18s; margin-bottom: 2px; }
        .nav-item:hover, .nav-item.active { background: rgba(232,160,32,0.12); color: var(--amber); }
        .sidebar-footer { padding: 20px 24px; border-top: 1px solid rgba(255,255,255,0.07); }
        .user-chip { display: flex; align-items: center; gap: 10px; }
        .user-avatar { width: 34px; height: 34px; background: var(--amber); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: var(--ink); flex-shrink: 0; }
        .user-info { flex: 1; overflow: hidden; }
        .user-name { font-size: 0.85rem; color: var(--cream); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .user-role { font-size: 0.72rem; color: rgba(255,252,245,0.35); }
        .logout-btn { color: rgba(255,252,245,0.35); text-decoration: none; font-size: 18px; transition: color 0.18s; padding: 4px; }
        .logout-btn:hover { color: var(--danger); }

        /* Main */
        .main {
            margin-left: 240px;
            flex: 1;
            padding: 40px 48px;
        }

        .topbar {
            display: flex; align-items: center;
            gap: 16px; margin-bottom: 40px;
        }

        .back-btn {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 9px 16px;
            border: 1.5px solid var(--border);
            border-radius: 9px;
            text-decoration: none;
            color: var(--muted);
            font-size: 0.85rem;
            transition: all 0.18s;
            background: var(--surface);
        }

        .back-btn:hover { border-color: var(--ink); color: var(--ink); }

        .topbar-title h1 {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem; color: var(--ink);
        }

        .topbar-title p {
            color: var(--muted); font-size: 0.88rem; margin-top: 4px;
        }

        /* Form card */
        .form-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 18px;
            overflow: hidden;
            max-width: 780px;
        }

        .form-card-header {
            padding: 24px 32px;
            border-bottom: 1px solid var(--border);
            background: #faf9f6;
            display: flex; align-items: center; gap: 14px;
        }

        .form-card-icon {
            width: 44px; height: 44px;
            background: var(--amber-light);
            border-radius: 12px;
            display: flex; align-items: center; justify-content: center;
            font-size: 20px;
        }

        .form-card-header h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.15rem; color: var(--ink);
        }

        .form-card-header p {
            font-size: 0.8rem; color: var(--muted); margin-top: 2px;
        }

        .form-body {
            padding: 32px;
        }

        .section-title {
            font-size: 0.72rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--muted);
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--border);
        }

        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 28px;
        }

        .form-grid.full { grid-template-columns: 1fr; }

        .form-group { display: flex; flex-direction: column; gap: 7px; }

        .form-label {
            font-size: 0.82rem;
            font-weight: 500;
            color: var(--ink);
            letter-spacing: 0.02em;
        }

        .required { color: var(--amber); margin-left: 2px; }

        .form-input, .form-select {
            padding: 12px 14px;
            border: 1.5px solid var(--border);
            border-radius: 9px;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.9rem;
            color: var(--ink);
            background: var(--cream);
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-input:focus, .form-select:focus {
            border-color: var(--amber);
            box-shadow: 0 0 0 3px rgba(232,160,32,0.1);
            background: #fff;
        }

        .form-input::placeholder { color: #ccc; }

        /* Mark slider */
        .mark-wrap {
            position: relative;
        }

        .mark-display {
            display: flex; align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
        }

        .mark-value {
            font-family: 'Playfair Display', serif;
            font-size: 1.4rem; color: var(--ink);
        }

        .mark-grade {
            font-size: 0.8rem;
            padding: 4px 10px;
            border-radius: 20px;
            font-weight: 500;
        }

        input[type="range"] {
            width: 100%;
            -webkit-appearance: none;
            height: 6px;
            border-radius: 3px;
            background: linear-gradient(to right, var(--amber) 0%, var(--amber) 0%, var(--border) 0%);
            outline: none;
            cursor: pointer;
        }

        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 20px; height: 20px;
            border-radius: 50%;
            background: var(--ink);
            border: 3px solid var(--amber);
            cursor: pointer;
        }

        /* Books section */
        .books-container {
            border: 1.5px solid var(--border);
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 16px;
        }

        .book-row {
            display: flex; gap: 10px; align-items: center;
            padding: 12px 14px;
            border-bottom: 1px solid var(--border);
            background: var(--cream);
        }

        .book-row:last-child { border-bottom: none; }

        .book-row input {
            flex: 1;
            padding: 8px 12px;
            border: 1.5px solid var(--border);
            border-radius: 7px;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.85rem;
            background: var(--surface);
            color: var(--ink);
            outline: none;
            transition: border-color 0.2s;
        }

        .book-row input:focus { border-color: var(--amber); }

        .btn-remove-book {
            width: 28px; height: 28px;
            border-radius: 6px;
            border: 1.5px solid var(--border);
            background: var(--surface);
            color: var(--muted);
            cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            font-size: 13px;
            transition: all 0.18s;
            flex-shrink: 0;
        }

        .btn-remove-book:hover { border-color: var(--danger); color: var(--danger); background: #fde8e8; }

        .btn-add-book {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 9px 16px;
            border: 1.5px dashed var(--amber);
            border-radius: 8px;
            background: var(--amber-light);
            color: #8a5c00;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.18s;
        }

        .btn-add-book:hover { background: #f5e3b0; }

        /* Footer actions */
        .form-footer {
            padding: 24px 32px;
            border-top: 1px solid var(--border);
            background: #faf9f6;
            display: flex; justify-content: flex-end; gap: 12px;
        }

        .btn-cancel {
            padding: 12px 22px;
            border: 1.5px solid var(--border);
            border-radius: 9px;
            background: var(--surface);
            color: var(--muted);
            font-family: 'DM Sans', sans-serif;
            font-size: 0.9rem;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex; align-items: center;
            transition: all 0.18s;
        }

        .btn-cancel:hover { border-color: var(--ink); color: var(--ink); }

        .btn-submit {
            padding: 12px 28px;
            background: var(--ink);
            color: var(--cream);
            border: none;
            border-radius: 9px;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn-submit:hover {
            background: #1e1c2e;
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(15,14,23,0.2);
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
        <a href="${pageContext.request.contextPath}/students" class="nav-item">
            <span class="icon">👥</span> Students
        </a>
        <a href="${pageContext.request.contextPath}/students/new" class="nav-item active">
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

<!-- Main Content -->
<main class="main">
    <div class="topbar">
        <a href="${pageContext.request.contextPath}/students" class="back-btn">← Back</a>
        <div class="topbar-title">
            <h1>${empty student.id ? 'Add New Student' : 'Edit Student'}</h1>
            <p>${empty student.id ? 'Fill in the details to add a new student' : 'Update student information'}</p>
        </div>
    </div>

    <div class="form-card">
        <div class="form-card-header">
            <div class="form-card-icon">${empty student.id ? '➕' : '✏'}</div>
            <div>
                <h3>${empty student.id ? 'New Student Registration' : 'Edit: ${student.firstName} ${student.lastName}'}</h3>
                <p>All fields marked with <span style="color:var(--amber)">*</span> are required</p>
            </div>
        </div>

        <form action="${empty student.id ?
            pageContext.request.contextPath.concat('/students') :
            pageContext.request.contextPath.concat('/students/').concat(student.id).concat('/update')}"
              method="post" id="studentForm">

            <div class="form-body">

                <!-- Personal Info -->
                <div class="section-title">Personal Information</div>
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="firstName">First Name <span class="required">*</span></label>
                        <input type="text" id="firstName" name="firstName" class="form-input"
                               placeholder="e.g. Nguyen" required value="${student.firstName}">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="lastName">Last Name <span class="required">*</span></label>
                        <input type="text" id="lastName" name="lastName" class="form-input"
                               placeholder="e.g. Van An" required value="${student.lastName}">
                    </div>
                </div>

                <!-- Account Info -->
                <div class="section-title">Account Details</div>
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" for="email">Email <span class="required">*</span></label>
                        <input type="email" id="email" name="email" class="form-input"
                               placeholder="student@example.com" required value="${student.email}">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="password">
                            Password
                            <c:if test="${not empty student.id}"><span style="color:var(--muted);font-weight:300;font-size:0.78rem;"> (leave blank to keep current)</span></c:if>
                            <c:if test="${empty student.id}"><span class="required">*</span></c:if>
                        </label>
                        <input type="password" id="password" name="password" class="form-input"
                               placeholder="••••••••"
                               <c:if test="${empty student.id}">required</c:if>>
                    </div>
                </div>

                <!-- Score -->
                <div class="section-title">Academic Score</div>
                <div class="form-grid full">
                    <div class="form-group">
                        <label class="form-label">Mark (0–100) <span class="required">*</span></label>
                        <div class="mark-display">
                            <span class="mark-value" id="markDisplay">${empty student.mark ? 0 : student.mark}</span>
                            <span class="mark-grade" id="markGrade">—</span>
                        </div>
                        <input type="range" id="markSlider" name="mark"
                               min="0" max="100" step="1"
                               value="${empty student.mark ? 0 : student.mark}"
                               oninput="updateMark(this.value)">
                        <input type="hidden" id="markHidden" name="mark" value="${empty student.mark ? 0 : student.mark}">
                    </div>
                </div>

                <!-- Books -->
                <div class="section-title">Books</div>
                <div id="booksContainer" class="books-container">
                    <c:choose>
                        <c:when test="${not empty student.books}">
                            <c:forEach var="book" items="${student.books}" varStatus="s">
                                <div class="book-row" id="book-${s.index}">
                                    <input type="text" name="books[${s.index}].title" placeholder="Book title" value="${book.title}">
                                    <input type="text" name="books[${s.index}].author" placeholder="Author" value="${book.author}">
                                    <button type="button" class="btn-remove-book" onclick="removeBook(${s.index})">✕</button>
                                </div>
                            </c:forEach>
                        </c:when>
                        <c:otherwise>
                            <div class="book-row" id="book-0">
                                <input type="text" name="books[0].title" placeholder="Book title">
                                <input type="text" name="books[0].author" placeholder="Author">
                                <button type="button" class="btn-remove-book" onclick="removeBook(0)">✕</button>
                            </div>
                        </c:otherwise>
                    </c:choose>
                </div>
                <button type="button" class="btn-add-book" onclick="addBook()">+ Add another book</button>

            </div><!-- /form-body -->

            <div class="form-footer">
                <a href="${pageContext.request.contextPath}/students" class="btn-cancel">Cancel</a>
                <button type="submit" class="btn-submit">
                    ${empty student.id ? '✓ Create Student' : '✓ Save Changes'}
                </button>
            </div>
        </form>
    </div>
</main>

<script>
    let bookCount = document.querySelectorAll('.book-row').length;

    function updateMark(val) {
        document.getElementById('markDisplay').textContent = val;
        document.getElementById('markHidden').value = val;

        const grade = document.getElementById('markGrade');
        const v = parseInt(val);
        if (v >= 90) { grade.textContent = 'Grade A'; grade.style.cssText = 'background:#d5f5e3;color:#1e8449'; }
        else if (v >= 75) { grade.textContent = 'Grade B'; grade.style.cssText = 'background:#d6eaf8;color:#1a5276'; }
        else if (v >= 55) { grade.textContent = 'Grade C'; grade.style.cssText = 'background:#fdebd0;color:#935116'; }
        else { grade.textContent = 'Grade D'; grade.style.cssText = 'background:#fde8e8;color:#922b21'; }

        // Update slider track fill
        const pct = (v / 100) * 100;
        document.getElementById('markSlider').style.background =
            `linear-gradient(to right, var(--amber) ${pct}%, var(--border) ${pct}%)`;
    }

    function addBook() {
        const container = document.getElementById('booksContainer');
        const idx = bookCount++;
        const row = document.createElement('div');
        row.className = 'book-row';
        row.id = 'book-' + idx;
        row.innerHTML = `
            <input type="text" name="books[${idx}].title" placeholder="Book title">
            <input type="text" name="books[${idx}].author" placeholder="Author">
            <button type="button" class="btn-remove-book" onclick="removeBook(${idx})">✕</button>
        `;
        container.appendChild(row);
    }

    function removeBook(idx) {
        const row = document.getElementById('book-' + idx);
        if (row) row.remove();
    }

    // Init mark display
    updateMark(document.getElementById('markSlider').value);
</script>
</body>
</html>
