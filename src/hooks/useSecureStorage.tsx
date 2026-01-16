import { useEffect, useState } from 'react';

/**
 * Secure Storage Hook
 *
 * Stores values in localStorage/sessionStorage with automatic expiry.
 *
 * Note: Encryption was removed in P1.3 security review.
 * The stored values (therapist ID, patient ID) are not secrets,
 * so encryption added complexity without security benefit.
 *
 * @param key - Storage key
 * @param value - Value to store (optional)
 * @param expiryMinutes - TTL in minutes (default: 60)
 * @param storageType - 'local' or 'session' (default: 'local')
 */
export const useSecureStorage = (
	key: string,
	value?: string,
	expiryMinutes = 60,
	storageType: 'local' | 'session' = 'local'
) => {
	const [storedValue, setStoredValue] = useState<string | null>(null);

	// Read from storage on mount
	useEffect(() => {
		const storage = storageType === 'local' ? localStorage : sessionStorage;
		const storedItem = storage.getItem(key);

		if (storedItem) {
			try {
				const parsedData = JSON.parse(storedItem);

				// Check if expired
				if (parsedData.expiry && new Date().getTime() > parsedData.expiry) {
					storage.removeItem(key);
					setStoredValue(null);
					return;
				}

				setStoredValue(parsedData.value);
			} catch {
				// Invalid JSON - remove corrupted data
				storage.removeItem(key);
				setStoredValue(null);
			}
		}
	}, [key, storageType]);

	// Write to storage when value changes
	useEffect(() => {
		if (!value || value === storedValue) return;

		const expiryTimestamp = new Date().getTime() + expiryMinutes * 60 * 1000;
		const dataToStore = JSON.stringify({ value, expiry: expiryTimestamp });

		const storage = storageType === 'local' ? localStorage : sessionStorage;
		storage.setItem(key, dataToStore);
		setStoredValue(value);
	}, [value, key, expiryMinutes, storageType, storedValue]);

	return storedValue;
};

/**
 * @deprecated - CryptoJS encryption removed in P1.3
 *
 * Previous implementation used backend encryption key:
 * // const encryptData = (data: string, key: string) => {
 * //   return CryptoJS.AES.encrypt(data, key).toString();
 * // };
 * // const decryptData = (encryptedData: string, key: string) => {
 * //   const bytes = CryptoJS.AES.decrypt(encryptedData, key);
 * //   return bytes.toString(CryptoJS.enc.Utf8);
 * // };
 */
