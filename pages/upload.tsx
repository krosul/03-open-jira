import React, {FC, useState} from 'react';
import entriesApi from '../apis/entriesApi';
import path from 'path';

interface props {
  url: string;
}
const upload: FC<props> = ({url}) => {
  const handler = (e: any) => {
    console.log(e.target?.files);
    const formdata = new FormData();
    formdata.append('file', e.target.files[0]);
    entriesApi.post('/hello', formdata);
  };
  console.log(path);
  return (
    <div>
      upload
      <label>
        Your Image File
        <input
          type="file"
          name="myImage"
          accept="image/*"
          placeholder="sube tu foto"
          onChange={(e) => handler(e)}
        />
      </label>
      <video src="/mono-8216.mp4" autoPlay controls={false} loop />
    </div>
  );
};
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export default upload;
