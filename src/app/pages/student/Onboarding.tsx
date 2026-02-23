import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { OnboardingStep1 } from '../../components/onboarding/OnboardingStep1';
import { OnboardingStep2 } from '../../components/onboarding/OnboardingStep2';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

function Onboarding() {
    const { user, saveOnboarding, loading } = useAuth();
    const navigate = useNavigate();
    const [step1Data, setStep1Data] = useState<any>(null);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate(ROUTES.SignIn, { replace: true });
            } else if (user.onboardingCompleted) {
                navigate(ROUTES.StudentDashboard, { replace: true });
            }
        }
    }, [user, loading, navigate]);

    if (loading || !user || user.onboardingCompleted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#FFD600] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[#1E1548]">Chargement...</p>
                </div>
            </div>
        );
    }

    const handleStep1Complete = (data: any) => {
        setStep1Data(data);
    };

    const handleStep2Complete = async (data: any) => {
        try {
            // Combiner les données des deux étapes
            const onboardingData = {
                ...step1Data,
                ...data,
                completedAt: new Date().toISOString(),
            };

            await saveOnboarding(onboardingData);

            // Rediriger vers le dashboard
            navigate(ROUTES.StudentDashboard);
        } catch (error) {
            console.error('Error completing onboarding:', error);
        }
    };

    return (
        <>
            <Navbar />
            {!step1Data ? (
                <OnboardingStep1 onComplete={handleStep1Complete} />
            ) : (
                <OnboardingStep2
                    formationData={step1Data}
                    onComplete={handleStep2Complete}
                    onBack={() => setStep1Data(null)}
                />
            )}
            <Footer />
        </>
    );
}

export default Onboarding;