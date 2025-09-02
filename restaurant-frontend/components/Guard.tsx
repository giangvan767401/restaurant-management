'use client';
import { useEffect, useState } from 'react';
import { isLoggedIn, getRole } from '../utils/auth';


export function useGuard(allowed: string[] = []) {
const [ok, setOk] = useState(false);
useEffect(() => {
if (!isLoggedIn()) { window.location.href = '/login'; return; }
if (allowed.length) {
const role = getRole();
if (!allowed.includes(role)) { window.location.href = '/'; return; }
}
setOk(true);
}, []);
return ok;
}