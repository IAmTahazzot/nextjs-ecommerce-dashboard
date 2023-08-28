import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Separator } from '@/components/ui/separator';

const Loading = () => {
  return (
    <div>
      <div className='container mt-5'>
        <div className={'flex justify-between items-center'}>
          <div>
            <Skeleton height={40} width={200} />
            <Skeleton width={400} />
          </div>
          <div>
            <Skeleton width={50} height={50} borderRadius={50} />
          </div>
        </div>
        <Separator className={'my-2'} />
        <Skeleton count={2} />
      </div>
    </div>
  );
};

export default Loading;
