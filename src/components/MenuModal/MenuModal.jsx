import React from 'react';
import { Modal, Button } from 'antd';
import './MenuModal.css';

const MenuModal = ({ open, onCancel, onOk, handleFeedback, title, children, mask = true, maskClosable = true, width = 800 }) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      mask={mask}
      maskClosable={maskClosable}
      width={width}
      footer={[
        <>
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>
        <Button key="ok" type="primary" onClick={onOk}>
          OK
        </Button>
        <Button key="feedback" type="feedback" onClick={handleFeedback}>
            Add Feedback
        </Button>
        </>
      ]}
      className="custom-modal"
    >
      {children}
    </Modal>
  );
};

export default MenuModal;

