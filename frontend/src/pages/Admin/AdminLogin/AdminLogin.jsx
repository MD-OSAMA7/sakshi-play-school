import { useState } from "react";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  LogIn,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email.";
    }

    if (!formData.password.trim()) {
      nextErrors.password = "Please enter your password.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    /*
      Temporary frontend navigation.

      Later this will be replaced with:
      API login → JWT/token → authentication → dashboard.
    */
    navigate("/admin/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-sky-50 px-4 py-8 font-sans sm:px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-floating lg:grid-cols-2">
        {/* =================================================
            LEFT SIDE
        ================================================== */}
        <div className="relative hidden overflow-hidden bg-brand-navy lg:block">
          {/* Decorative circles */}
          <div
            aria-hidden="true"
            className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-brand-blue/30"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-20 -right-16 h-52 w-52 rounded-full bg-brand-gold/20"
          />

          <div className="relative z-10 flex h-full flex-col justify-between p-10">
            {/* Logo */}
            <Link
              to="/"
              aria-label="Sakshi Play School home"
              className="inline-block"
            >
              <img
                src="/images/logo.png"
                alt="Sakshi Play School"
                className="h-20 w-auto object-contain"
              />
            </Link>

            {/* Content */}
            <div className="py-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-brand-navy">
                <ShieldCheck
                  size={25}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-wide text-brand-gold">
                Secure Administration
              </p>

              <h1 className="mt-2 max-w-md text-4xl font-extrabold leading-tight text-white">
                Welcome to{" "}
                <span className="text-pink-400">
                  Admin Portal
                </span>
              </h1>

              <p className="mt-5 max-w-md text-base leading-7 text-white/75">
                Manage your school website content, gallery,
                events and notices from one convenient place.
              </p>
            </div>

            {/* Footer */}
            <p className="text-xs text-white/50">
              Sakshi Play School Admin Panel
            </p>
          </div>
        </div>

        {/* =================================================
            LOGIN FORM
        ================================================== */}
        <div className="flex items-center justify-center p-6 sm:p-8 lg:p-10">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-8 flex justify-center lg:hidden">
              <Link
                to="/"
                aria-label="Sakshi Play School home"
              >
                <img
                  src="/images/logo.png"
                  alt="Sakshi Play School"
                  className="h-20 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Heading */}
            <div className="text-center lg:text-left">
              <p className="text-sm font-bold uppercase tracking-wide text-brand-blue">
                Administration
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
                Admin{" "}
                <span className="text-pink-600">
                  Login
                </span>
              </h2>

              <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-base">
                Sign in to manage your Sakshi Play School website.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8"
              noValidate
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="admin-email"
                  className="mb-2 block text-sm font-semibold text-text-primary"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                    aria-hidden="true"
                  />

                  <input
                    id="admin-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@example.com"
                    autoComplete="email"
                    className={`h-12 w-full rounded-lg border bg-white pl-10 pr-4 text-sm text-text-primary outline-none transition-shadow placeholder:text-gray-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 ${
                      errors.email
                        ? "border-error"
                        : "border-gray-300"
                    }`}
                  />
                </div>

                {errors.email && (
                  <p className="mt-1.5 text-xs text-error">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mt-5">
                <label
                  htmlFor="admin-password"
                  className="mb-2 block text-sm font-semibold text-text-primary"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                    aria-hidden="true"
                  />

                  <input
                    id="admin-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={`h-12 w-full rounded-lg border bg-white pl-10 pr-12 text-sm text-text-primary outline-none transition-shadow placeholder:text-gray-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 ${
                      errors.password
                        ? "border-error"
                        : "border-gray-300"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-text-secondary transition-colors duration-200 hover:text-brand-navy"
                  >
                    {showPassword ? (
                      <EyeOff
                        size={18}
                        aria-hidden="true"
                      />
                    ) : (
                      <Eye
                        size={18}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1.5 text-xs text-error">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-navy px-6 text-sm font-bold text-white shadow-button transition-all duration-200 hover:bg-brand-blue hover:shadow-button-hover"
              >
                <LogIn
                  size={18}
                  aria-hidden="true"
                />

                Login to Admin Panel
              </button>
            </form>

            {/* Security Note */}
            <div className="mt-6 rounded-xl bg-sky-50 px-4 py-3">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-brand-blue"
                  aria-hidden="true"
                />

                <p className="text-xs leading-5 text-text-secondary">
                  Admin access is restricted to authorized
                  school administrators.
                </p>
              </div>
            </div>

            {/* Back to Website */}
            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-sm font-semibold text-brand-blue transition-colors duration-200 hover:text-brand-navy"
              >
                ← Back to Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminLogin;