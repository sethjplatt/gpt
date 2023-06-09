import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import e from 'cors';
import Dropzone from 'react-dropzone';

const MessageFormUI = ({
  setAttachment,
  message,
  handleChange,
  handleSubmit,
}) => {
  const [preview, setPreview] = useState('');

  return (
    <div className='message-form-container'>
      {preview && (
        <div className='message-form-preview'>
          <img
            className='message-form-preview-image'
            src={preview}
            onLoad={() => URL.revokeObjectURL(preview)}
            alt='preview'
          />
          <XMarkIcon
            className='message-form-icon-x'
            onClick={() => {
              setPreview('');
              setAttachment('');
            }}
          />
        </div>
      )}
      <div className='message-form'>
        <div className='message-form-input-container'>
          <input
            className='message-form-input'
            type='text'
            value={message}
            onChange={handleChange}
            placeholder='Send a message...'
          />
        </div>
        <div className='message-form-icons'>
          <Dropzone
            acceptedFiles='.png, .jpg, .jpeg'
            multiple={false}
            noClick={true}
            onDrop={(acceptedFiles) => {
              setAttachment(acceptedFiles[0]);
              setPreview(URL.createObjectURL(acceptedFiles[0]));
            }}
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PaperClipIcon
                  className='message-form-icon-clip'
                  onClick={open}
                />
              </div>
            )}
          </Dropzone>
          <hr className='vertical-line' />
          <PaperAirplaneIcon
            className='message-form-icon-airplane'
            onClick={() => {
              setPreview('');
              handleSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageFormUI;
