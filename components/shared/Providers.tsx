'use client';

import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import NextToploader from 'nextjs-toploader';
import React from 'react';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<>
			<SessionProvider>{children}</SessionProvider>
			<Toaster />
			<NextToploader />
		</>
	);
};
