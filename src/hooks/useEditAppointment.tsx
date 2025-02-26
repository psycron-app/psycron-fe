import { useState } from 'react';
import type { IAgendaClick } from '@psycron/components/agenda/Agenda.types';

export const useEditAppointment = () => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [selectedEditingSlot, setSelectedEditingSlot] =
		useState<IAgendaClick | null>(null);

	const startEditing = (slot: IAgendaClick) => {
		setSelectedEditingSlot(slot);
		setIsEditing(true);
	};

	const cancelEditing = () => {
		setSelectedEditingSlot(null);
		setIsEditing(false);
	};

	return { isEditing, selectedEditingSlot, startEditing, cancelEditing };
};
