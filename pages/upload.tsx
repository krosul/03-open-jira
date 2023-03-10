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
      <img src="/mountains-7831286_1280.webp" />
    </div>
  );
};
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export default upload;
