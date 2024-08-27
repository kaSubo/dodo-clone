import { Button } from '@/components/ui';
import { CircleUser, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
	onSignInClick?: () => void;
	className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onSignInClick }) => {
	const { data: session } = useSession();
  console.log(session?.user)

	return (
		<div className={className}>
			{!session ? (
				<Button
					variant='outline'
					className='flex items-center gap-1'
					onClick={onSignInClick}>
					<User size={16} />
					Log in
				</Button>
			) : (
				<Link href='/profile'>
					<Button
						className='flex items-center gap-2'
						variant='secondary'>
						{session.user!.image ? (
							<Image
								src={session.user!.image}
								alt='profile image'
								className='rounded-full object-cover border border-primary'
								width={30}
								height={30}
							/>
						) : (
							<CircleUser size={18} />
						)}
						Profile
					</Button>
				</Link>
			)}
		</div>
	);
};
