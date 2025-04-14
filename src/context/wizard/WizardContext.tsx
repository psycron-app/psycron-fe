import type { FC, ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { WizardContextProps } from './WizardContext.types';

const WizardContext = createContext<WizardContextProps | undefined>(undefined);

export const WizardProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [activeStep, setActiveStep] = useState<number>(0);
	const [direction, setDirection] = useState<number>(0);

	const navigate = useNavigate();

	const handleNext = () => {
		setDirection(1);
		setActiveStep((prev) => prev + 1);
	};

	const handleBack = () => {
		if (activeStep === 0) {
			navigate(-1);
		} else {
			setDirection(-1);
			setActiveStep((prev) => prev - 1);
		}
	};

	return (
		<WizardContext.Provider
			value={{ activeStep, direction, handleNext, handleBack }}
		>
			{children}
		</WizardContext.Provider>
	);
};

export const useWizardContext = () => {
	const context = useContext(WizardContext);
	if (!context) {
		throw new Error('useWizardContext must be used within a WizardProvider');
	}
	return context;
};
