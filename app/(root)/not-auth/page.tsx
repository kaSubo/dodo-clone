import { InfoCard } from '@/components/shared';

export default function NotAuthorizedPage() {
	return (
		<div className='flex flex-col items-center justify-center mt-40'>
			<InfoCard
				title='Access Denied'
				text='You are not authorized to access this page'
				imageUrl='/assets/images/lock.png'
			/>
		</div>
	);
}
