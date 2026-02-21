import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
//import { useAuth } from "../../hooks/useAuth";
import { UserRole } from "../../lib/supabase";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';

function SignIn() {
    //const { signIn } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState<UserRole>('student');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            //await signIn(email, password, userType);
            // signIn réussi → le listener onAuthStateChange met à jour le user partagé
            // → App.tsx détecte le changement et redirige automatiquement
            // On remet loading à false car la redirection est gérée par App.tsx
            setLoading(false);
        } catch (err: any) {
            setError(err.message || "Erreur de connexion. Vérifiez vos identifiants.");
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="w-full min-h-[calc(100vh-80px)] bg-[#F8F9FD] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Decorative Shapes */}
                <div className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 opacity-60">
                    <svg width="100%" height="100%" viewBox="0 0 320 320" fill="none">
                        <ellipse cx="100" cy="220" rx="150" ry="100" fill="#C7D2FE" opacity="0.5" />
                    </svg>
                </div>
                <div className="absolute top-20 right-0 w-48 sm:w-64 h-48 sm:h-64 opacity-60">
                    <svg width="100%" height="100%" viewBox="0 0 256 256" fill="none">
                        <ellipse cx="180" cy="130" rx="120" ry="80" fill="#FEF3C7" opacity="0.6" />
                    </svg>
                </div>

                <div className="w-full max-w-[520px] relative z-10">
                    {/* Card */}
                    <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[24px] p-6 sm:p-10 shadow-[0_4px_24px_rgba(30,21,72,0.08)]">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-[28px] sm:text-[32px] font-bold leading-tight text-[#1E1548] mb-2">
                                Bon retour !
                            </h2>
                            <p className="text-[14px] sm:text-[16px] font-normal leading-[24px] text-[#6B7280]">
                                Connecte-toi pour accéder à ton espace personnel
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[12px]">
                                <p className="text-[14px] text-red-600">{error}</p>
                            </div>
                        )}

                        {/* User Type Tabs */}
                        <div className="mb-6">
                            <div className="flex gap-2 mb-3 bg-[#F8F9FD] p-1 rounded-[12px]">
                                <button
                                    type="button"
                                    onClick={() => setUserType('student')}
                                    className={`
                      flex-1 py-3 px-4 rounded-[10px] text-[14px] sm:text-[16px] font-semibold transition-all
                      ${userType === 'student'
                                            ? 'bg-white text-[#1E1548] shadow-sm'
                                            : 'text-[#6B7280] hover:text-[#1E1548]'
                                        }
                    `}
                                >
                                    👨‍🎓 Candidat
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUserType('admin')}
                                    className={`
                      flex-1 py-3 px-4 rounded-[10px] text-[14px] sm:text-[16px] font-semibold transition-all
                      ${userType === 'admin'
                                            ? 'bg-white text-[#1E1548] shadow-sm'
                                            : 'text-[#6B7280] hover:text-[#1E1548]'
                                        }
                    `}
                                >
                                    👨‍💼 Admin
                                </button>
                            </div>

                            {/* Info Banner */}
                            <div className={`p-3 rounded-[10px] border-2 transition-all ${userType === 'student'
                                ? 'bg-[#FFF4CC] border-[#FFD600]'
                                : 'bg-[#E8ECFF] border-[#1E1548]'
                                }`}>
                                <p className="text-[12px] sm:text-[13px] text-[#1E1548] leading-[18px]">
                                    {userType === 'student'
                                        ? '🎓 Accès à ton espace personnel, suivi de ton parcours et recherche d\'alternance'
                                        : '⚙️ Accès à l\'interface de gestion, validation CVs et support étudiants'
                                    }
                                </p>
                            </div>

                            {/* Security Info for Admin */}
                            {userType === 'admin' && (
                                <div className="mt-3 flex gap-3 p-3 bg-[#FFF4CC] border border-[#FFD600] rounded-[10px]">
                                    <Lock className="w-5 h-5 text-[#1E1548] flex-shrink-0 mt-0.5" />
                                    <p className="text-[12px] sm:text-[13px] text-[#1E1548] leading-[18px]">
                                        <strong>Sécurité :</strong> Les comptes admin sont protégés. Si vous n'avez pas de compte admin, veuillez contacter l'équipe TBEE.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-[14px] font-medium text-[#1E1548]">
                                    Adresse email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ton.email@exemple.fr"
                                    required
                                    disabled={loading}
                                    className="w-full h-12 px-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:border-transparent transition-all disabled:opacity-50"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-[14px] font-medium text-[#1E1548]">
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        disabled={loading}
                                        className="w-full h-12 px-4 pr-12 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:border-transparent transition-all disabled:opacity-50"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1E1548] focus:outline-none"
                                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="text-right">
                                <a
                                    href="#forgot-password"
                                    className="text-[14px] font-normal text-[#1E1548] hover:text-[#FFD600] focus:outline-none underline transition-colors"
                                >
                                    Mot de passe oublié ?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[16px] font-semibold hover:bg-[#FDC700] transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:ring-offset-2 shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Connexion en cours..." : "Se connecter →"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[rgba(30,21,72,0.1)]"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white px-4 text-[14px] text-[#6B7280]">
                                    ou
                                </span>
                            </div>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center">
                            <p className="text-[14px] sm:text-[16px] font-normal text-[#6B7280]">
                                Pas encore de compte ?{" "}
                                <Link to={ROUTES.SignUp}>
                                    <button
                                        className="text-[#1E1548] font-semibold hover:text-[#FFD600] focus:outline-none underline transition-colors"
                                    >
                                        Créer un compte
                                    </button>
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Back to Home Link */}
                    <div className="text-center mt-6">
                        <Link to={ROUTES.Home}>
                            <button
                                className="text-[14px] text-[#6B7280] hover:text-[#1E1548] focus:outline-none transition-colors"
                            >
                                ← Retour à l'accueil
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignIn;