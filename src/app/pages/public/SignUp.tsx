import { useState, useEffect } from "react";
import { Eye, EyeOff, Info } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../router/routes';

function SignUp() {
    const { user, signUp, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [hasRQTH, setHasRQTH] = useState<boolean | null>(null);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Rediriger si l'utilisateur est déjà connecté
    useEffect(() => {
        if (user) {
            console.log('User detected, redirecting...', user.role);
            if (user.role === 'admin') {
                navigate(routes.AdminDashboard.path, { replace: true });
            } else {
                navigate(routes.StudentDashboard.path, { replace: true });
            }
        }
    }, [user, navigate]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        formation: "",
        level: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validation des mots de passe
        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        if (formData.password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères");
            return;
        }

        if (!acceptTerms) {
            setError("Vous devez accepter les conditions d'utilisation");
            return;
        }

        if (hasRQTH === null) {
            setError("Veuillez indiquer si vous bénéficiez d'une reconnaissance RQTH");
            return;
        }

        setLoading(true);

        try {
            await signUp(
                formData.email,
                formData.password,
                formData.firstName,
                formData.lastName,
                //hasRQTH
            );
            setSuccess(true);
            // Optionnel : rediriger vers la page de connexion après quelques secondes
            setTimeout(() => {
                navigate(routes.SignIn.path);
            }, 5000);
        } catch (err: any) {
            setError(err.message || "Erreur lors de l'inscription. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    if (success) {
        return (
            <div className="w-full min-h-screen bg-[#F8F9FD] flex items-center justify-center py-12 px-4">
                <div className="max-w-[520px] bg-white border border-[rgba(30,21,72,0.08)] rounded-[24px] p-10 shadow-[0_4px_24px_rgba(30,21,72,0.08)] text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFD600] flex items-center justify-center">
                        <svg className="w-8 h-8 text-[#1E1548]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-[28px] font-bold text-[#1E1548] mb-2">
                        Bienvenue sur TBEE ! 🎉
                    </h2>
                    <p className="text-[16px] text-[#6B7280] mb-6">
                        Ton compte a été créé avec succès. Vérifie ton email pour confirmer ton inscription, puis connecte-toi pour commencer ton parcours.
                    </p>
                    <p className="text-[14px] text-[#6B7280] mb-4">
                        Redirection vers la page de connexion dans quelques secondes...
                    </p>
                    <Link to={routes.SignIn.path}>
                        <button
                            className="w-full h-12 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[16px] font-semibold hover:bg-[#FDC700] transition-all"
                        >
                            Se connecter maintenant →
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen bg-[#F8F9FD] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Decorative Donut Shape */}
                <div className="absolute top-12 sm:top-20 right-0 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 opacity-70">
                    <svg width="100%" height="100%" viewBox="0 0 320 320" fill="none">
                        <circle cx="160" cy="160" r="140" fill="#C7D2FE" opacity="0.4" />
                        <circle cx="160" cy="160" r="80" fill="#F8F9FD" />
                        <circle cx="160" cy="80" r="60" fill="#FEF3C7" opacity="0.5" />
                    </svg>
                </div>

                <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 opacity-60">
                    <svg width="100%" height="100%" viewBox="0 0 256 256" fill="none">
                        <ellipse cx="80" cy="180" rx="100" ry="80" fill="#FEF3C7" opacity="0.5" />
                    </svg>
                </div>

                <div className="max-w-[840px] mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-6 sm:mb-8">
                        <h2 className="text-[28px] sm:text-[32px] font-bold leading-tight text-[#1E1548] mb-2">
                            Créer mon compte
                        </h2>
                        <p className="text-[14px] sm:text-[16px] font-normal leading-[24px] text-[#6B7280]">
                            Rejoins TBEE et commence ton accompagnement personnalisé
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[24px] p-6 sm:p-10 shadow-[0_4px_24px_rgba(30,21,72,0.08)]">

                        {/* Info Banner - Candidat Only */}
                        <div className="mb-6 p-4 bg-[#E8ECFF] border-2 border-[#1E1548] rounded-[12px]">
                            <p className="text-[13px] sm:text-[14px] text-[#1E1548] leading-[20px]">
                                <strong>📝 Inscription candidat :</strong> Cette page permet de créer un compte <strong>candidat</strong> pour accéder au parcours d'accompagnement. Les comptes administrateurs sont créés manuellement par l'équipe TBEE pour des raisons de sécurité.
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[12px]">
                                <p className="text-[14px] text-red-600">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Section 1: Informations personnelles */}
                            <div className="space-y-6">
                                <h3 className="text-[20px] sm:text-[24px] font-semibold text-[#1E1548] pb-3 border-b border-[rgba(30,21,72,0.1)]">
                                    Informations personnelles
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    {/* First Name */}
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="block text-[14px] font-medium text-[#1E1548]">
                                            Prénom
                                        </label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => handleChange("firstName", e.target.value)}
                                            placeholder="Jean"
                                            required
                                            disabled={loading || authLoading}
                                            className="w-full h-12 px-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:border-transparent transition-all disabled:opacity-50" />
                                    </div>

                                    {/* Last Name */}
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="block text-[14px] font-medium text-[#1E1548]">
                                            Nom
                                        </label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => handleChange("lastName", e.target.value)}
                                            placeholder="Dupont"
                                            required
                                            disabled={loading || authLoading}
                                            className="w-full h-12 px-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:border-transparent transition-all disabled:opacity-50" />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-[14px] font-medium text-[#1E1548]">
                                        Adresse email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        placeholder="jean.dupont@exemple.fr"
                                        required
                                        disabled={loading || authLoading}
                                        className="w-full h-12 px-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:border-transparent transition-all disabled:opacity-50" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    {/* Password */}
                                    <div className="space-y-2">
                                        <label htmlFor="password" className="block text-[14px] font-medium text-[#1E1548]">
                                            Mot de passe
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                value={formData.password}
                                                onChange={(e) => handleChange("password", e.target.value)}
                                                placeholder="••••••••"
                                                required
                                                disabled={loading || authLoading}
                                                className="w-full h-12 px-4 pr-12 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:border-transparent transition-all disabled:opacity-50" />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1E1548] focus:outline-none"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="space-y-2">
                                        <label htmlFor="confirmPassword" className="block text-[14px] font-medium text-[#1E1548]">
                                            Confirmer le mot de passe
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={formData.confirmPassword}
                                                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                                placeholder="••••••••"
                                                required
                                                disabled={loading || authLoading}
                                                className="w-full h-12 px-4 pr-12 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:border-transparent transition-all disabled:opacity-50" />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1E1548] focus:outline-none"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Password Requirements */}
                                <div className="flex gap-2 items-start p-3 bg-[#E8ECFF] border border-[rgba(30,21,72,0.1)] rounded-[10px]">
                                    <Info className="w-5 h-5 text-[#1E1548] flex-shrink-0 mt-0.5" />
                                    <p className="text-[12px] sm:text-[13px] text-[#1E1548] leading-[18px]">
                                        <strong>Sécurité :</strong> Ton mot de passe doit contenir au moins 6 caractères
                                    </p>
                                </div>
                            </div>

                            {/* Section 2: RQTH Question */}
                            <div className="space-y-6">
                                <h3 className="text-[20px] sm:text-[24px] font-semibold text-[#1E1548] pb-3 border-b border-[rgba(30,21,72,0.1)]">
                                    Reconnaissance travailleur handicapé
                                </h3>

                                <div className="space-y-3">
                                    <p className="text-[14px] sm:text-[16px] text-[#1E1548] leading-[24px]">
                                        Es-tu en situation de handicap ou bénéficies-tu d'une reconnaissance RQTH ?
                                    </p>

                                    <div className="flex gap-3 sm:gap-4 flex-wrap">
                                        <button
                                            type="button"
                                            onClick={() => setHasRQTH(true)}
                                            className={`flex-1 min-w-[140px] py-3 px-4 rounded-[12px] text-[14px] sm:text-[16px] font-semibold transition-all border-2 ${hasRQTH === true
                                                ? 'bg-[#FFD600] border-[#FFD600] text-[#1E1548]'
                                                : 'bg-white border-[rgba(30,21,72,0.1)] text-[#6B7280] hover:border-[#FFD600]'}`}
                                        >
                                            Oui
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setHasRQTH(false)}
                                            className={`flex-1 min-w-[140px] py-3 px-4 rounded-[12px] text-[14px] sm:text-[16px] font-semibold transition-all border-2 ${hasRQTH === false
                                                ? 'bg-[#FFD600] border-[#FFD600] text-[#1E1548]'
                                                : 'bg-white border-[rgba(30,21,72,0.1)] text-[#6B7280] hover:border-[#FFD600]'}`}
                                        >
                                            Non
                                        </button>
                                    </div>

                                    <div className="flex gap-2 items-start p-3 bg-[#FFF4CC] border border-[#FFD600] rounded-[10px]">
                                        <Info className="w-5 h-5 text-[#1E1548] flex-shrink-0 mt-0.5" />
                                        <p className="text-[12px] sm:text-[13px] text-[#1E1548] leading-[18px]">
                                            <strong>Confidentialité :</strong> Cette information reste strictement confidentielle et nous permet de t'accompagner au mieux. Tu peux la modifier à tout moment dans ton profil.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="acceptTerms"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                        className="mt-1 w-5 h-5 rounded border-[rgba(30,21,72,0.2)] text-[#FFD600] focus:ring-[#FFD600] focus:ring-offset-0"
                                        required />
                                    <label htmlFor="acceptTerms" className="text-[14px] sm:text-[16px] text-[#1E1548] leading-[24px]">
                                        J'accepte les{" "}
                                        <Link to={routes.LegalNotice.path} className="text-[#1E1548] font-semibold underline hover:text-[#FFD600]">
                                            conditions d'utilisation
                                        </Link>{" "}
                                        et la{" "}
                                        <Link to={routes.PrivacyPolicy.path} className="text-[#1E1548] font-semibold underline hover:text-[#FFD600]">
                                            politique de confidentialité
                                        </Link>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || authLoading || hasRQTH === null}
                                className="w-full h-12 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[16px] font-semibold hover:bg-[#FDC700] transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:ring-offset-2 shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Création du compte..." : "Créer mon compte →"}
                            </button>
                        </form>

                        {/* Login Link */}
                        <div className="text-center mt-6 pt-6 border-t border-[rgba(30,21,72,0.1)]">
                            <p className="text-[14px] sm:text-[16px] font-normal text-[#6B7280]">
                                Déjà inscrit(e) ?{" "}
                                <Link to={routes.SignIn.path}>
                                    <button
                                        className="text-[#1E1548] font-semibold hover:text-[#FFD600] focus:outline-none underline transition-colors"
                                    >
                                        Se connecter
                                    </button>
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Back to Home Link */}
                    <div className="text-center mt-6">
                        <Link to={routes.Home.path}>
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

export default SignUp;