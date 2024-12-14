export async function hashPassword(password) {
	const hashBuffer = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(password));
	const hashArray = Array.from(new Uint8Array(hashBuffer));

	return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
