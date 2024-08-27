import { getUserSession } from '@/components/lib/getUserSession';
import { ProfileForm } from '@/components/shared';
import { prisma } from '@/prisma/prismaClient';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
	const session = await getUserSession();

	if (!session) {
		redirect('/not-auth');
	}

	const user = await prisma.user.findFirst({
		where: {
			id: Number(session.id),
		},
	});

	if (!user) {
		redirect('/not-auth');
	}

	return <ProfileForm data={user} />;
}
