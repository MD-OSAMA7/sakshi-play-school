import { useEffect, useState } from "react";

import { Eye, EyeOff, LoaderCircle, ShieldCheck } from "lucide-react";

import { useAuth, useClerk, useSignIn } from "@clerk/react";

import { FaGoogle } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const clerk = useClerk();

  const { isLoaded, isSignedIn } = useAuth();

  const { signIn, fetchStatus } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  /* =========================================================
     REDIRECT IF ALREADY SIGNED IN
  ========================================================== */

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/admin/dashboard", {
        replace: true,
      });
    }
  }, [isLoaded, isSignedIn, navigate]);

  /* =========================================================
     GOOGLE LOGIN
  ========================================================== */

  const handleGoogleLogin = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      setGoogleLoading(true);
      setError("");

      await clerk.openSignIn({
        forceRedirectUrl: "/admin/dashboard",
        signUpForceRedirectUrl: "/admin/dashboard",
        withSignUp: false,
        transferable: false,
        oauthFlow: "redirect",
      });
    } catch (loginError) {
      console.error("Google login error:", loginError);

      setError(loginError?.message || "Google login failed. Please try again.");

      setGoogleLoading(false);
    }
  };

  /* =========================================================
     EMAIL + PASSWORD LOGIN
  ========================================================== */

  const handleEmailLogin = async (event) => {
    event.preventDefault();

    if (!isLoaded || !signIn) {
      return;
    }

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setEmailLoading(true);
      setError("");

      const { error: signInError } = await signIn.password({
        emailAddress: cleanEmail,
        password,
      });

      if (signInError) {
        setError(signInError.message || "Invalid email or password.");

        return;
      }

      /* =====================================================
         SUCCESSFUL PASSWORD LOGIN
      ====================================================== */

      if (signIn.status === "complete") {
        const { error: finalizeError } = await signIn.finalize({
          navigate: async () => {
            navigate("/admin/dashboard", {
              replace: true,
            });
          },
        });

        if (finalizeError) {
          setError(finalizeError.message || "Unable to complete login.");
        }

        return;
      }

      /* =====================================================
         ADDITIONAL AUTHENTICATION REQUIREMENTS
      ====================================================== */

      if (signIn.status === "needs_second_factor") {
        setError("Additional verification is required for this account.");

        return;
      }

      if (signIn.status === "needs_client_trust") {
        setError("This device needs additional verification before login.");

        return;
      }

      setError("Login could not be completed. Please try again.");
    } catch (loginError) {
      console.error("Email login error:", loginError);

      setError(loginError?.message || "Invalid email or password.");
    } finally {
      setEmailLoading(false);
    }
  };

  const isEmailSubmitting = emailLoading || fetchStatus === "fetching";

  return (
    <main className="flex min-h-screen items-center justify-center bg-sky-50 px-4 py-8 font-sans sm:px-6">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-floating">
        <div className="p-6 sm:p-8 lg:p-10">
          {/* =================================================
              LOGO
          ================================================== */}

          <div className="mb-7 flex justify-center">
            <Link to="/" aria-label="Sakshi Play School home">
              <img
                src="/images/logo.png"
                alt="Sakshi Play School"
                className="h-20 w-auto object-contain"
              />
            </Link>
          </div>

          {/* =================================================
              LOGIN HEADING
          ================================================== */}

          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-brand-blue">
              Administration
            </p>

            <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl">
              Admin <span className="text-pink-600">Login</span>
            </h1>

            <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-base">
              Sign in using your authorized email and password or continue with
              Google.
            </p>
          </div>

          {/* =================================================
              ERROR MESSAGE
          ================================================== */}

          {error && (
            <div
              role="alert"
              className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700"
            >
              {error}
            </div>
          )}

          {/* =================================================
              EMAIL + PASSWORD
          ================================================== */}

          <form onSubmit={handleEmailLogin} className="mt-7 space-y-5">
            {/* Email */}

            <div>
              <label
                htmlFor="admin-email"
                className="mb-1.5 block text-sm font-semibold leading-6 text-brand-navy"
              >
                Email Address
              </label>

              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                placeholder="Enter admin email"
                disabled={isEmailSubmitting}
                className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm leading-6 text-text-primary outline-none transition-colors placeholder:text-gray-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 disabled:cursor-not-allowed disabled:bg-gray-50"
              />
            </div>

            {/* Password */}

            <div>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-semibold leading-6 text-brand-navy"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  disabled={isEmailSubmitting}
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 pr-12 text-sm leading-6 text-text-primary outline-none transition-colors placeholder:text-gray-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 disabled:cursor-not-allowed disabled:bg-gray-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  disabled={isEmailSubmitting}
                  className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-gray-500 transition-colors hover:text-brand-navy disabled:cursor-not-allowed"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={18} aria-hidden="true" />
                  ) : (
                    <Eye size={18} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {/* Email Sign In */}

            <button
              type="submit"
              disabled={!isLoaded || !email || !password || isEmailSubmitting}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-navy px-6 text-sm font-bold text-white shadow-button transition-all duration-200 hover:bg-brand-blue hover:shadow-button-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isEmailSubmitting ? (
                <>
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                  Signing in...
                </>
              ) : (
                "Sign in with Email"
              )}
            </button>
          </form>

          {/* =================================================
              DIVIDER
          ================================================== */}

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-gray-400">
              Or
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* =================================================
              GOOGLE LOGIN
          ================================================== */}

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={!isLoaded || googleLoading}
            className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-6 text-sm font-bold text-text-primary shadow-button transition-all duration-200 hover:border-brand-blue hover:bg-gray-50 hover:shadow-button-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {googleLoading ? (
              <LoaderCircle
                size={18}
                className="animate-spin"
                aria-hidden="true"
              />
            ) : (
              <FaGoogle size={18} aria-hidden="true" />
            )}

            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          {/* =================================================
              AUTHORIZATION NOTE
          ================================================== */}

          <div className="mt-5 text-center">
            <p className="text-xs leading-5 text-text-secondary">
              Only authorized school administrators can access this portal.
            </p>
          </div>

          {/* =================================================
              SECURITY NOTE
          ================================================== */}

          <div className="mt-6 rounded-xl bg-sky-50 px-4 py-3">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-brand-blue"
                aria-hidden="true"
              />

              <p className="text-xs leading-5 text-text-secondary">
                Admin access is restricted to authorized school administrators.
              </p>
            </div>
          </div>

          {/* =================================================
              BACK TO WEBSITE
          ================================================== */}

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
    </main>
  );
}

export default AdminLogin;
