import { cn } from '@/lib/utils';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-12 2xl:px-14', className)}>{children}</div>;
}
