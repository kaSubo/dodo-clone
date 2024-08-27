import { cn } from '@/components/lib';

interface Props {
	text: string;
	className?: string;
}

export const FormError: React.FC<Props> = ({ text, className }) => (
	<p className={cn('text-red-500 text-xs ml-2', className)}>*{text}</p>
);
