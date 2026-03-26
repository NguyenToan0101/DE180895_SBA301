<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Portal — Login</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
            --ink: #0f0e17;
            --cream: #fffcf5;
            --amber: #e8a020;
            --amber-light: #f5c86a;
            --muted: #7a7580;
            --border: #e2ddd6;
            --surface: #ffffff;
            --error: #c0392b;
        }

        body {
            font-family: 'DM Sans', sans-serif;
            background: var(--cream);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
        }

        /* Decorative background */
        body::before {
            content: '';
            position: fixed;
            top: -200px; right: -200px;
            width: 600px; height: 600px;
            background: radial-gradient(circle, rgba(232,160,32,0.12) 0%, transparent 70%);
            pointer-events: none;
        }
        body::after {
            content: '';
            position: fixed;
            bottom: -150px; left: -150px;
            width: 500px; height: 500px;
            background: radial-gradient(circle, rgba(15,14,23,0.06) 0%, transparent 70%);
            pointer-events: none;
        }

        .page-wrapper {
            display: flex;
            width: 900px;
            max-width: 95vw;
            min-height: 540px;
            box-shadow: 0 32px 80px rgba(15,14,23,0.14), 0 2px 8px rgba(15,14,23,0.06);
            border-radius: 20px;
            overflow: hidden;
            animation: rise 0.7s cubic-bezier(.22,.68,0,1.2) both;
        }

        @keyframes rise {
            from { opacity: 0; transform: translateY(32px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Left panel */
        .panel-left {
            flex: 1;
            background: var(--ink);
            padding: 56px 48px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            overflow: hidden;
        }

        .panel-left::before {
            content: '';
            position: absolute;
            top: -80px; left: -80px;
            width: 320px; height: 320px;
            border: 60px solid rgba(232,160,32,0.08);
            border-radius: 50%;
        }
        .panel-left::after {
            content: '';
            position: absolute;
            bottom: -60px; right: -60px;
            width: 240px; height: 240px;
            border: 40px solid rgba(232,160,32,0.06);
            border-radius: 50%;
        }

        .brand {
            position: relative; z-index: 1;
        }

        .brand-icon {
            width: 52px; height: 52px;
            background: var(--amber);
            border-radius: 14px;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 28px;
            font-size: 24px;
        }

        .brand h1 {
            font-family: 'Playfair Display', serif;
            font-size: 2.2rem;
            color: var(--cream);
            line-height: 1.2;
            margin-bottom: 12px;
        }

        .brand h1 span {
            color: var(--amber);
        }

        .brand p {
            color: rgba(255,252,245,0.5);
            font-size: 0.93rem;
            line-height: 1.6;
            font-weight: 300;
            max-width: 240px;
        }

        .panel-stats {
            position: relative; z-index: 1;
            display: flex; gap: 24px;
        }

        .stat {
            background: rgba(255,252,245,0.06);
            border: 1px solid rgba(255,252,245,0.1);
            border-radius: 12px;
            padding: 16px 20px;
            flex: 1;
        }

        .stat-num {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            color: var(--amber);
            line-height: 1;
            margin-bottom: 4px;
        }

        .stat-label {
            font-size: 0.78rem;
            color: rgba(255,252,245,0.4);
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }

        /* Right panel */
        .panel-right {
            flex: 1;
            background: var(--surface);
            padding: 56px 48px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .login-header {
            margin-bottom: 40px;
        }

        .login-header h2 {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            color: var(--ink);
            margin-bottom: 8px;
        }

        .login-header p {
            color: var(--muted);
            font-size: 0.9rem;
        }

        .error-banner {
            background: #fdf0ef;
            border: 1px solid rgba(192,57,43,0.2);
            border-left: 3px solid var(--error);
            border-radius: 8px;
            padding: 12px 16px;
            margin-bottom: 24px;
            color: var(--error);
            font-size: 0.88rem;
            display: flex; align-items: center; gap: 8px;
            animation: shake 0.4s ease;
        }

        @keyframes shake {
            0%,100%{transform:translateX(0)}
            25%{transform:translateX(-6px)}
            75%{transform:translateX(6px)}
        }

        .form-group {
            margin-bottom: 22px;
        }

        .form-label {
            display: block;
            font-size: 0.82rem;
            font-weight: 500;
            color: var(--ink);
            text-transform: uppercase;
            letter-spacing: 0.06em;
            margin-bottom: 8px;
        }

        .input-wrap {
            position: relative;
        }

        .input-icon {
            position: absolute;
            left: 16px; top: 50%;
            transform: translateY(-50%);
            color: var(--muted);
            font-size: 16px;
            pointer-events: none;
        }

        .form-input {
            width: 100%;
            padding: 14px 16px 14px 44px;
            border: 1.5px solid var(--border);
            border-radius: 10px;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.95rem;
            color: var(--ink);
            background: var(--cream);
            transition: border-color 0.2s, box-shadow 0.2s;
            outline: none;
        }

        .form-input:focus {
            border-color: var(--amber);
            box-shadow: 0 0 0 4px rgba(232,160,32,0.1);
            background: #fff;
        }

        .form-input::placeholder { color: #bbb; }

        .btn-login {
            width: 100%;
            padding: 15px;
            background: var(--ink);
            color: var(--cream);
            border: none;
            border-radius: 10px;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.95rem;
            font-weight: 500;
            cursor: pointer;
            letter-spacing: 0.04em;
            transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
            margin-top: 8px;
            position: relative;
            overflow: hidden;
        }

        .btn-login::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, transparent 40%, rgba(232,160,32,0.15));
        }

        .btn-login:hover {
            background: #1e1c2e;
            transform: translateY(-1px);
            box-shadow: 0 8px 24px rgba(15,14,23,0.2);
        }

        .btn-login:active { transform: translateY(0); }

        .divider {
            display: flex; align-items: center; gap: 16px;
            margin: 24px 0 0;
        }

        .divider::before, .divider::after {
            content: ''; flex: 1;
            height: 1px; background: var(--border);
        }

        .divider span {
            font-size: 0.8rem;
            color: var(--muted);
            white-space: nowrap;
        }

        @media (max-width: 680px) {
            .panel-left { display: none; }
            .panel-right { padding: 40px 32px; }
        }
    </style>
</head>
<body>

<div class="page-wrapper">
    <!-- Left decorative panel -->
    <div class="panel-left">
        <div class="brand">
            <div class="brand-icon">🎓</div>
            <h1>Student<br><span>Portal</span></h1>
            <p>Manage your academic records, books, and performance all in one place.</p>
        </div>
        <div class="panel-stats">
            <div class="stat">
                <div class="stat-num">∞</div>
                <div class="stat-label">Records</div>
            </div>
            <div class="stat">
                <div class="stat-num">24/7</div>
                <div class="stat-label">Access</div>
            </div>
        </div>
    </div>

    <!-- Right login form -->
    <div class="panel-right">
        <div class="login-header">
            <h2>Welcome back</h2>
            <p>Sign in to your account to continue</p>
        </div>

        <% if (request.getAttribute("error") != null) { %>
        <div class="error-banner">
            ⚠ <%= request.getAttribute("error") %>
        </div>
        <% } %>

        <form action="${pageContext.request.contextPath}/login" method="post">
            <div class="form-group">
                <label class="form-label" for="email">Email Address</label>
                <div class="input-wrap">
                    <span class="input-icon">✉</span>
                    <input type="email" id="email" name="email" class="form-input"
                           placeholder="you@example.com" required
                           value="${param.email}">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label" for="password">Password</label>
                <div class="input-wrap">
                    <span class="input-icon">🔒</span>
                    <input type="password" id="password" name="password" class="form-input"
                           placeholder="Enter your password" required>
                </div>
            </div>

            <button type="submit" class="btn-login">Sign In →</button>
        </form>

        <div class="divider"><span>Student Management System</span></div>
    </div>
</div>

</body>
</html>
