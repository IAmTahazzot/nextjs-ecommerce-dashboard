'use client';

import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/Modal/modal';
import { Button } from '@/components/ui/button';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Modal
        title={'Are you sure?'}
        description={'This action cannot be undone.'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className={'flex items-center gap-3 mt-3'}>
          <Button disabled={loading} variant={'outline'} onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            variant={'destructive'}
            onClick={() => {
              onConfirm();
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AlertModal;
