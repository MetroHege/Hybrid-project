import {useState} from 'react';
import {useForm} from '../hooks/FormHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
import {useNavigate} from 'react-router-dom';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: '',
  };

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !file) {
        return;
      }
      const fileResult = await postFile(file, token);
      const mediaResult = await postMedia(fileResult, inputs, token);
      alert(mediaResult.message);
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doUpload,
    initValues,
  );

  return (
    <>
      <div className="rounded p-8 shadow-lg">
        <h3 className="mb-8 text-center text-3xl font-bold">Upload</h3>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex w-2/5 flex-col">
            <label className="text-left font-bold" htmlFor="title">
              Title
            </label>
            <input
              className="m-3 w-full rounded border border-slate-500 p-2 text-slate-950"
              name="title"
              type="text"
              id="title"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex w-2/5 flex-col">
            <label className="text-left font-bold" htmlFor="description">
              Description
            </label>
            <textarea
              className="m-3 w-full rounded border border-slate-500 p-2 text-slate-950"
              name="description"
              rows={5}
              id="description"
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="flex w-2/5 flex-col">
            <label className="text-left font-bold" htmlFor="file">
              File
            </label>
            <label
              className="m-3 w-full cursor-pointer rounded border border-slate-500 p-2 "
              style={{display: 'block'}}
            >
              <span id="file-name">Choose a file...</span>
              <input
                name="file"
                type="file"
                id="file"
                accept="image/*, video/*"
                onChange={handleFileChange}
                style={{display: 'none'}}
              />
            </label>
          </div>
          <div className="w-4/5">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : 'https://via.placeholder.com/200?text=Choose+image'
              }
              alt="preview"
              width="300"
              className="mx-auto"
            />
          </div>
          <div className="w-3/5">
            <button
              className="m-3 mx-auto flex w-1/3 justify-center rounded bg-gradient-to-r from-emerald-400 to-cyan-400 p-2 text-black hover:font-bold"
              type="submit"
              disabled={file && inputs.title.length > 3 ? false : true}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Upload;
