export interface WizardContextProps {
	activeStep: number;
	direction: number;
	handleBack: () => void;
	handleNext: () => void;
}
