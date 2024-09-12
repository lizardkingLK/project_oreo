import { Button } from '@/components/ui/button';
import { UserGroupProps } from '../../types';
import { useGroupListStore } from '../../state';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '../state';

export const GroupListItem = ({ id }: UserGroupProps) => {
  const { toggleVisible } = useSidebarStore((state) => state);

  const { handleGroupChange, activeGroup } = useGroupListStore(
    (state) => state
  );

  const handleGroupItemClick = (id: number) => {
    window.innerWidth < 768 && toggleVisible();
    handleGroupChange(id);
  };

  return (
    <Button
      variant={'ghost'}
      className={cn(
        'h-[calc(8vh)] rounded-none first:rounded-tr-xl',
        activeGroup?.id == id && 'bg-secondary'
      )}
      onClick={() => handleGroupItemClick(id)}
    >
      <div>Group {id}</div>
    </Button>
  );
};
