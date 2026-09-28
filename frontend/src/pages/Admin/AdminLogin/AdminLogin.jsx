import { useEffect } from "react";

import { useAuth, useClerk } from "@clerk/react";
import { FaGoogle } from "react-icons/fa";
import { ShieldCheck } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const clerk = useClerk();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isLoaded, isSignedIn, navigate]);

  const handleGoogleLogin = () => {
    clerk.openSignIn({
      forceRedirectUrl: "/admin/dashboard",
      signUpForceRedirectUrl: "/admin/dashboard",
      withSignUp: false,
      transferable: false,
      oauthFlow: "redirect",
    });
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
                <ShieldCheck size={25} strokeWidth={2} aria-hidden="true" />
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-wide text-brand-gold">
                Secure Administration
              </p>

              <h1 className="mt-2 max-w-md text-4xl font-extrabold leading-tight text-white">
                Welcome to <span className="text-pink-400">Admin Portal</span>
              </h1>

              <p className="mt-5 max-w-md text-base leading-7 text-white/75">
                Manage your school website content, gallery, events and notices
                from one convenient place.
              </p>
            </div>

            {/* Footer */}
            <p className="text-xs text-white/50">
              Sakshi Play School Admin Panel
            </p>
          </div>
        </div>

        {/* =================================================
            LOGIN AREA
        ================================================== */}
        <div className="flex items-center justify-center p-6 sm:p-8 lg:p-10">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-8 flex justify-center lg:hidden">
              <Link to="/" aria-label="Sakshi Play School home">
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
                Admin <span className="text-pink-600">Login</span>
              </h2>

              <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-base">
                Sign in with the authorized Google account to manage your Sakshi
                Play School website.
              </p>
            </div>

            {/* Google Login */}
            <div className="mt-8">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={!isLoaded}
                className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-6 text-sm font-bold text-text-primary shadow-button transition-all duration-200 hover:border-brand-blue hover:bg-gray-50 hover:shadow-button-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaGoogle size={18} aria-hidden="true" />
                Continue with Google
              </button>
            </div>

            {/* Account Note */}
            <div className="mt-4 text-center">
              <p className="text-xs leading-5 text-text-secondary">
                Only authorized school administrators can access this portal.
              </p>
            </div>

            {/* Security Note */}
            <div className="mt-6 rounded-xl bg-sky-50 px-4 py-3">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-brand-blue"
                  aria-hidden="true"
                />

                <p className="text-xs leading-5 text-text-secondary">
                  Admin access is restricted to authorized school
                  administrators.
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
