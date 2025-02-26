import { useEffect, useState } from 'react';
import { getEncryptionKey } from '@psycron/api/auth';
import CryptoJS from 'crypto-js';

const encryptData = (data: string, key: string) => {
	return CryptoJS.AES.encrypt(data, key).toString();
};

const decryptData = (encryptedData: string, key: string) => {
	try {
		const bytes = CryptoJS.AES.decrypt(encryptedData, key);
		return bytes.toString(CryptoJS.enc.Utf8);
	} catch {
		return null;
	}
};

export const useSecureStorage = (
	key: string,
	value?: string,
	expiryMinutes = 60,
	storageType: 'local' | 'session' = 'local'
) => {
	const [storedValue, setStoredValue] = useState<string | null>(null);
	const [encryptionKey, setEncryptionKey] = useState<string | null>(null);

	useEffect(() => {
		const fetchKey = async () => {
			const fetchedKey = await getEncryptionKey();
			setEncryptionKey(fetchedKey);
		};

		fetchKey();
	}, []);

	useEffect(() => {
		if (!encryptionKey) return;

		const storage = storageType === 'local' ? localStorage : sessionStorage;
		const encryptedItem = storage.getItem(key);

		if (encryptedItem) {
			try {
				const decryptedItem = decryptData(encryptedItem, encryptionKey);
				if (!decryptedItem) return;

				// 🔹 Verifica se o dado já expirou
				const parsedData = JSON.parse(decryptedItem);
				if (parsedData.expiry && new Date().getTime() > parsedData.expiry) {
					storage.removeItem(key);
					setStoredValue(null);
					return;
				}

				setStoredValue(parsedData.value);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error('Failed to decrypt data:', error);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [encryptionKey]);

	useEffect(() => {
		if (!encryptionKey || !value || value === storedValue) return;

		const expiryTimestamp = new Date().getTime() + expiryMinutes * 60 * 1000;

		const dataToStore = JSON.stringify({ value, expiry: expiryTimestamp });
		const encryptedValue = encryptData(dataToStore, encryptionKey);

		const storage = storageType === 'local' ? localStorage : sessionStorage;
		storage.setItem(key, encryptedValue);
		setStoredValue(value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, key, expiryMinutes, encryptionKey]);

	return storedValue;
};
