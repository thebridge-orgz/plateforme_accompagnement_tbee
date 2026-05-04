import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../router/routes';
import { OnboardingPersonalInfo, type PersonalInfoData } from '../../components/onboarding/OnboardingPersonalInfo';
import { OnboardingStep1 } from '../../components/onboarding/OnboardingStep1';
import { OnboardingStep2 } from '../../components/onboarding/OnboardingStep2';
import { useModules } from '../../../hooks/useModules'
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

function Onboarding() {
    const { user, loading, saveOnboarding, refreshUser } = useAuth();
    const { firstModule, unlockModule } = useModules();

    const navigate = useNavigate();
    const [personalInfoData, setPersonalInfoData] = useState<PersonalInfoData | null>(null);
    const [step1Data, setStep1Data] = useState<any>(null);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate(routes.SignIn.path, { replace: true });
            } else if (user.onboardingCompleted) {
                navigate(routes.StudentDashboard.path, { replace: true });
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

    const handlePersonalInfoComplete = async (data: PersonalInfoData) => {
        const onboardingDataStep1 = { ...personalInfoData, ...data, onboardingStep: 2 };
        setPersonalInfoData(onboardingDataStep1);
        saveOnboarding(user.id, onboardingDataStep1);
        await refreshUser();
    };

    const handleStep1Complete = async (data: any) => {
        const onboardingDataStep2 = { ...step1Data, ...data, onboardingStep: 3 };
        setStep1Data(onboardingDataStep2);
        saveOnboarding(user.id, onboardingDataStep2);
        await refreshUser();
    };

    const handleStep2Complete = async (data: any) => {
        try {
            const onboardingData = { ...data, completedAt: new Date().toISOString(), onboardingCompleted: true };
            await saveOnboarding(user.id, onboardingData);
            await refreshUser();
            await unlockModule(firstModule.id);
            navigate(routes.StudentDashboard.path);
        } catch (error) {
            console.error('Error completing onboarding:', error);
        }
    };
    
    return (
        <>
            <Navbar />
            {!user.onboardingStep || user.onboardingStep === 1 ? (
                <OnboardingPersonalInfo
                    initialFirstName={user.firstName}
                    initialLastName={user.lastName}
                    initialAaddress={user.address}
                    initialBirthDate={user.birthDate}   
                    initialCity={user.city}
                    initialCurrentLevel={user.currentLevel}
                    initialPhone={user.phone}
                    initialpostalCode={user.postalCode}
                    onComplete={handlePersonalInfoComplete}
                />
            ) : user.onboardingStep === 2 ? (
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
